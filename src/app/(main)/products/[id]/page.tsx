import { Suspense } from "react";
import { notFound } from "next/navigation";
import ProductDetails from "@/components/product-details";
import { ProductDetailsSkeleton } from "@/components/product-skeleton";
import { getProduct } from "@/utils/data-access/api";

export async function generateMetadata({ params }: { params: { id: string } }) {
  try {
    const product = await getProduct(params.id);
    return {
      title: `${product.title} | Premium Shopping`,
      description: product.description,
    };
  } catch (error) {
    return {
      title: "Product | Premium Shopping",
      description: "View product details",
    };
  }
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const product = await getProduct(params.id);

    return (
      <div className="container px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Suspense fallback={<ProductDetailsSkeleton />}>
          <ProductDetails product={product} />
        </Suspense>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
