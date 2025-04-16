"use client";

import { useEffect, useState } from "react";
import { useWishlist } from "@/utils/context/wishlist-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import WishlistItems from "@/components/wishlist-items";
import { Loader2 } from "lucide-react";

export default function WishlistPage() {
  const { isLoading } = useWishlist();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) {
    return (
      <div className="container flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Card>
          <CardHeader className="flex flex-row items-center">
            <div>
              <CardTitle>Wishlist</CardTitle>
              <p className="text-sm text-muted-foreground">
                Products you&apos;ve saved for later
              </p>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            <WishlistItems />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
