"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/utils/context/cart-context";
import { useWishlist } from "@/utils/context/wishlist-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import type { IProduct } from "@/common/common.interface";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ProductDetailsProps {
  product: IProduct;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(
      `${quantity} ${quantity === 1 ? "item" : "items"} of ${
        product.title
      } added to your cart.`
    );
  };

  const handleToggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.success(`${product.title} has been removed from your wishlist.`);
    } else {
      addToWishlist(product);
      toast.success(`${product.title} has been added to your wishlist.`);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card className="overflow-hidden p-2">
        <div className="relative aspect-square overflow-hidden rounded-md bg-muted">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </Card>

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">{product.title}</h1>
          <div className="mt-2 flex items-center gap-4">
            <div className="text-xl font-bold">${product.price.toFixed(2)}</div>
            <Badge variant="outline" className="text-xs">
              {product.category}
            </Badge>
          </div>
          <div className="mt-2 flex items-center gap-1 text-yellow-500">
            <span>★★★★☆</span>
            <span className="text-sm text-muted-foreground">(4.5/5)</span>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <p className="text-muted-foreground">{product.description}</p>

          <div className="flex items-center gap-4">
            <div className="flex items-center rounded-md border">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-none"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
                <span className="sr-only">Decrease quantity</span>
              </Button>
              <div className="w-12 text-center">{quantity}</div>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-none"
                onClick={increaseQuantity}
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Increase quantity</span>
              </Button>
            </div>

            <Button className="flex-1" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>

            <Button
              variant="outline"
              size="icon"
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
          </div>
        </div>

        <Separator />

        <Tabs defaultValue="description">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-4">
            <div className="space-y-4">
              <p>{product.description}</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu
                aliquam nisl nisl eu nisl.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="details" className="mt-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-sm font-medium">Category</div>
                <div className="text-sm">{product.category}</div>
                <div className="text-sm font-medium">Material</div>
                <div className="text-sm">Premium Quality</div>
                <div className="text-sm font-medium">Dimensions</div>
                <div className="text-sm">Varies by size</div>
                <div className="text-sm font-medium">Weight</div>
                <div className="text-sm">0.5 kg</div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-4">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold">4.5</div>
                <div>
                  <div className="text-yellow-500">★★★★☆</div>
                  <div className="text-sm text-muted-foreground">
                    Based on 24 reviews
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="font-medium">John Doe</div>
                    <div className="text-yellow-500">★★★★★</div>
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    Great product! Exactly as described.
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <div className="font-medium">Jane Smith</div>
                    <div className="text-yellow-500">★★★★☆</div>
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    Good quality but shipping took longer than expected.
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
