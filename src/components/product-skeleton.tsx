import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export function ProductSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <div className="aspect-square">
            <Skeleton className="h-full w-full" />
          </div>
          <CardContent className="p-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-2/3" />
          </CardContent>
          <CardFooter className="flex items-center justify-between p-4 pt-0">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-4 w-12" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export function ProductDetailsSkeleton() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card className="overflow-hidden p-2">
        <Skeleton className="aspect-square rounded-md" />
      </Card>

      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-full" />
          <div className="mt-2 flex items-center gap-4">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-20" />
          </div>
          <Skeleton className="mt-2 h-4 w-32" />
        </div>

        <Skeleton className="h-px w-full" />

        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />

          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-10" />
          </div>
        </div>

        <Skeleton className="h-px w-full" />

        <div>
          <div className="grid grid-cols-3 gap-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="mt-4 h-32 w-full" />
        </div>
      </div>
    </div>
  );
}
