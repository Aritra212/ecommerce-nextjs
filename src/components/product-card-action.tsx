"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/utils/context/cart-context";
import { useWishlist } from "@/utils/context/wishlist-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import type { IProduct } from "@/common/common.interface";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Props = {
  product: IProduct;
};

export default function ProductCard({ product }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.title} has been added to your cart.`);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.success(`${product.title} has been removed from your wishlist.`);
    } else {
      addToWishlist(product);
      toast.success(`${product.title} has been added to your wishlist.`);
    }
  };

  return (
    <Link href={`/products/${product.id}`}>
      <Card
        className="group overflow-hidden transition-all duration-300 hover:shadow-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            fill
            className={cn(
              "object-cover transition-transform duration-500",
              isHovered ? "scale-110" : "scale-100"
            )}
          />

          {product.category === "electronics" && (
            <Badge className="absolute left-2 top-2">Electronics</Badge>
          )}

          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              size="icon"
              variant="secondary"
              className="h-9 w-9 rounded-full"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="sr-only">Add to cart</span>
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="h-9 w-9 rounded-full"
              onClick={handleToggleWishlist}
            >
              <Heart
                className={cn(
                  "h-4 w-4",
                  inWishlist && "fill-current text-red-500"
                )}
              />
              <span className="sr-only">
                {inWishlist ? "Remove from wishlist" : "Add to wishlist"}
              </span>
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="h-9 w-9 rounded-full"
              asChild
            >
              <Link href={`/products/${product.id}`}>
                <Eye className="h-4 w-4" />
                <span className="sr-only">Quick view</span>
              </Link>
            </Button>
          </div>
        </div>

        <CardContent className="p-4">
          <h3 className="line-clamp-1 text-sm font-medium">{product.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {product.category}
          </p>
        </CardContent>

        <CardFooter className="flex items-center justify-between p-4 pt-0">
          <div className="font-semibold">${product.price.toFixed(2)}</div>
          <div className="text-sm text-yellow-500">★★★★☆</div>
        </CardFooter>
      </Card>
    </Link>
  );
}
