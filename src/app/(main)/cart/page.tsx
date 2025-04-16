"use client";

import { useCart } from "@/utils/context/cart-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import CartItem from "@/components/cart-item";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import EmptyCart from "@/components/empty-cart";
import { placeOrder } from "@/utils/data-access/order";
import useUser from "@/hooks/use-user";
import { toast } from "sonner";

export default function CartPage() {
  const { cart, totalPrice, isLoading, removeFromCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const { user } = useUser();

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

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  const handleOrder = async () => {
    if (!user)
      return toast.error("You need to log in before placing any orders.");

    const { error } = await placeOrder(cart, user?.id, totalPrice);

    if (error) return toast.error(error);

    Promise.all([cart?.map((item) => removeFromCart(item.id))]);

    toast.success("Order placed successfully!");
  };

  return (
    <div className="container px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <h1 className="text-3xl font-bold">Your Shopping Cart</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${(totalPrice * 0.1).toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${(totalPrice + totalPrice * 0.1).toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" size="lg" onClick={handleOrder}>
                Place Order
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
