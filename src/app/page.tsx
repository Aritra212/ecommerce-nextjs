import { Suspense } from "react";
import ProductGrid from "@/components/product-grid";
import { ProductSkeleton } from "@/components/product-skeleton";
import HeroSection from "@/components/hero";
import FilterSidebar from "@/components/filter-sidebar";

export default function Home() {
  return (
    <div className="container px-4 py-8 sm:px-6 sm:py-12 lg:px-8 mx-auto">
      <HeroSection />
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr]">
        <FilterSidebar />
        <div>
          <Suspense fallback={<ProductSkeleton />}>
            <ProductGrid />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
