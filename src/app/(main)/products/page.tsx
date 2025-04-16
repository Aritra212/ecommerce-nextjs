import { Suspense } from "react";
import ProductGrid from "@/components/product-grid";
import { ProductSkeleton } from "@/components/product-skeleton";
import FilterSidebar from "@/components/filter-sidebar";

type Props = {
  searchParams: {
    category?: string | string[];
    color?: string | string[];
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
    search?: string;
  };
};

export default async function AllProductsPage(props: Props) {
  // Properly await the searchParams
  const { searchParams } = await Promise.resolve(props);

  return (
    <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr]">
      <FilterSidebar />
      <div>
        <Suspense fallback={<ProductSkeleton />}>
          <ProductGrid searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
