import { Suspense } from "react";
import ProductGrid from "@/components/product-grid";
import { ProductSkeleton } from "@/components/product-skeleton";
import FilterSheet from "@/components/filter-sidebar";
import { Button } from "@/components/ui/button";
import { FunnelPlus } from "lucide-react";

export default async function AllProductsPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  return (
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
  );
}
