import { Suspense } from "react";
import { notFound } from "next/navigation";
import ProductDetails from "@/components/product-details";
import { ProductDetailsSkeleton } from "@/components/product-skeleton";
import { getProduct } from "@/utils/data-access/api";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  try {
    const product = await getProduct(id);
    return {
      title: `${product.title} | Premium Shopping`,
      description: product.description,
    };
  } catch (error) {
    console.error(error);
    return {
      title: "Product | Premium Shopping",
      description: "View product details",
    };
  }
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  try {
    const product = await getProduct(id);

    return (
      <div className="container px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Suspense fallback={<ProductDetailsSkeleton />}>
          <ProductDetails product={product} />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error(error);
    notFound();
  }
}
