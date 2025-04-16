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

  const options = filterOptions;

  // Filter by category
  if (options.category) {
    const categories = Array.isArray(options.category)
      ? options.category
      : [options.category];

    if (categories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        categories.some(
          (cat) => product.category.toLowerCase() === cat.toLowerCase()
        )
      );
    }
  }

  // Filter by color
  if (options.color) {
    const colors = Array.isArray(options.color)
      ? options.color
      : [options.color];

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
  const minPrice = options.minPrice ? parseFloat(options.minPrice) : undefined;
  const maxPrice = options.maxPrice ? parseFloat(options.maxPrice) : undefined;

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
  if (options.search) {
    const searchTerm = options.search.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
  }

  // Sort products
  if (options.sort) {
    switch (options.sort) {
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
