// API functions to fetch data from the Fake Store API

export async function getProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}

export async function getProduct(id: string) {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }
  return response.json();
}

export async function getProductsByCategory(category: string) {
  const response = await fetch(
    `https://fakestoreapi.com/products/category/${category}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products by category");
  }
  return response.json();
}

export async function getCategories() {
  const response = await fetch("https://fakestoreapi.com/products/categories");
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return response.json();
}

export async function getUsers() {
  const response = await fetch("https://fakestoreapi.com/users");
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
}

export async function getUser(id: string) {
  const response = await fetch(`https://fakestoreapi.com/users/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  return response.json();
}

export async function getCarts() {
  const response = await fetch("https://fakestoreapi.com/carts");
  if (!response.ok) {
    throw new Error("Failed to fetch carts");
  }
  return response.json();
}

export async function getCart(id: string) {
  const response = await fetch(`https://fakestoreapi.com/carts/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch cart");
  }
  return response.json();
}
