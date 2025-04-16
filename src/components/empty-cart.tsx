import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export default function EmptyCart() {
  return (
    <div className="container flex flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
        <ShoppingCart className="h-12 w-12 text-muted-foreground" />
      </div>
      <h1 className="mt-6 text-2xl font-bold">Your cart is empty</h1>
      <p className="mt-2 text-muted-foreground">
        Looks like you haven&apos;t added any products to your cart yet.
      </p>
      <Button asChild className="mt-8">
        <Link href="/products">Continue Shopping</Link>
      </Button>
    </div>
  );
}
