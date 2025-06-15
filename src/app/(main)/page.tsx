import { Suspense } from "react";
import ProductGrid from "@/components/product-grid";
import { ProductSkeleton } from "@/components/product-skeleton";
import HeroSection from "@/components/hero";
import FilterSheet from "@/components/filter-sidebar";
import { Button } from "@/components/ui/button";
import { FunnelPlus } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Home({ searchParams }: { searchParams: any }) {
  return (
    <div className="container px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <HeroSection />
      <div className="space-y-4">
        <FilterSheet>
          <Button>
            <FunnelPlus />
            Filter
          </Button>
        </FilterSheet>
        <Suspense fallback={<ProductSkeleton />}>
          <ProductGrid searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
