"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useWishlist } from "@/utils/context/wishlist-context";
import { useCart } from "@/utils/context/cart-context";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2 } from "lucide-react";
import { IProduct } from "@/common/common.interface";
import { toast } from "sonner";

export default function WishlistItems() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [removingItems, setRemovingItems] = useState<number[]>([]);

  const handleRemove = (id: number) => {
    setRemovingItems((prev) => [...prev, id]);
    setTimeout(() => {
      removeFromWishlist(id);
      setRemovingItems((prev) => prev.filter((itemId) => itemId !== id));
    }, 300);
  };

  const handleAddToCart = (product: IProduct) => {
    addToCart(product);
    toast.success(`${product.title} has been added to your cart.`);
  };

  if (wishlist.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Your wishlist is empty.</p>
        <Button asChild className="mt-4">
          <Link href="/products">Discover Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {wishlist.map((product) => (
        <div
          key={product.id}
          className={`flex items-start gap-4 rounded-lg border p-4 transition-all duration-300 ${
            removingItems.includes(product.id)
              ? "opacity-0 scale-95"
              : "opacity-100 scale-100"
          }`}
        >
          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-muted">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              fill
              className="object-contain"
            />
          </div>

          <div className="flex-1">
            <h3 className="font-medium">
              <Link
                href={`/products/${product.id}`}
                className="hover:underline"
              >
                {product.title}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {product.category}
            </p>
            <div className="mt-2 flex items-center justify-between">
              <div className="font-semibold">${product.price.toFixed(2)}</div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart className="mr-1 h-4 w-4" />
                  Add to Cart
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-destructive"
                  onClick={() => handleRemove(product.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
