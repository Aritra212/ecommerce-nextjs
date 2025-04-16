import { Suspense } from "react";
import ProductGrid from "@/components/product-grid";
import { ProductSkeleton } from "@/components/product-skeleton";
import HeroSection from "@/components/hero";
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

export default async function Home(props: Props) {
  const { searchParams } = await Promise.resolve(props);

  return (
    <div className="container px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <HeroSection />
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr]">
        <FilterSidebar />
        <div>
          <Suspense fallback={<ProductSkeleton />}>
            <ProductGrid searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
