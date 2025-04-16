"use server";

import { IProduct } from "@/common/common.interface";

interface FilterOptions {
  category?: string | string[];
  color?: string | string[];
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
  search?: string;
}

export async function filterProducts(
  products: IProduct[],
  filterOptions: FilterOptions
): Promise<IProduct[]> {
  let filteredProducts = [...products];

  // Filter by category
  if (filterOptions.category) {
    const categories = Array.isArray(filterOptions.category)
      ? filterOptions.category
      : [filterOptions.category];

    if (categories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        categories.some(
          (cat) => product.category.toLowerCase() === cat.toLowerCase()
        )
      );
    }
  }

  // Filter by color
  if (filterOptions.color) {
    const colors = Array.isArray(filterOptions.color)
      ? filterOptions.color
      : [filterOptions.color];

    if (colors.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        // Since color isn't directly in the IProduct interface, we can search in description
        colors.some((color) =>
          product.description.toLowerCase().includes(color.toLowerCase())
        )
      );
    }
  }

  // Filter by price range
  const minPrice = filterOptions.minPrice
    ? parseFloat(filterOptions.minPrice)
    : undefined;
  const maxPrice = filterOptions.maxPrice
    ? parseFloat(filterOptions.maxPrice)
    : undefined;

  if (minPrice !== undefined) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= minPrice
    );
  }

  if (maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price <= maxPrice
    );
  }

  // Filter by search term
  if (filterOptions.search) {
    const searchTerm = filterOptions.search.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
  }

  // Sort products
  if (filterOptions.sort) {
    switch (filterOptions.sort) {
      case "price-asc":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        filteredProducts.sort((a, b) => b.id - a.id);
    }
  }

  return filteredProducts;
}
