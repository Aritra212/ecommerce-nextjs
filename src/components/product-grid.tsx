import { getProducts } from "@/utils/data-access/api";
import ProductCard from "@/components/product-card-action";
import { filterProducts } from "@/utils/data-access/filter-products";

interface ProductGridProps {
  searchParams?: {
    category?: string | string[];
    color?: string | string[];
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
    search?: string;
  };
}

export default async function ProductGrid({
  searchParams = {},
}: ProductGridProps) {
  // Fetch all products
  const allProducts = await getProducts();

  // Apply server-side filtering
  const filteredProducts = await filterProducts(allProducts, searchParams);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <p className="text-lg text-muted-foreground">
            No products match your filters.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Try adjusting your search criteria.
          </p>
        </div>
      )}
    </div>
  );
}
