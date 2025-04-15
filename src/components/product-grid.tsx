import { getProducts } from "@/utils/data-access/api";
import ProductCard from "@/components/product-card-action";
import { IProduct } from "@/common/common.interface";

export default async function ProductGrid() {
  const products = await getProducts();

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {(products as IProduct[])?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
