"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/utils/context/cart-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { ICartItem } from "@/common/common.interface";

interface Props {
  item: ICartItem;
}

export default function CartItem({ item }: Props) {
  const { updateQuantity, removeFromCart } = useCart();
  const [isRemoving, setIsRemoving] = useState(false);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      removeFromCart(item.id);
    }, 300);
  };

  return (
    <Card
      className={`overflow-hidden transition-all duration-300 ${
        isRemoving ? "opacity-0 scale-95" : "opacity-100 scale-100"
      }`}
    >
      <div className="flex items-start p-4">
        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-muted sm:h-32 sm:w-32">
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.title}
            fill
            className="object-contain"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div className="flex justify-between">
            <div>
              <h3 className="text-sm font-medium">
                <Link href={`/products/${item.id}`} className="hover:underline">
                  {item.title}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {item.category}
              </p>
            </div>
            <p className="text-sm font-medium">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center rounded-md border">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-none"
                onClick={() => handleQuantityChange(item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                <Minus className="h-3 w-3" />
                <span className="sr-only">Decrease quantity</span>
              </Button>
              <div className="w-8 text-center text-sm">{item.quantity}</div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-none"
                onClick={() => handleQuantityChange(item.quantity + 1)}
              >
                <Plus className="h-3 w-3" />
                <span className="sr-only">Increase quantity</span>
              </Button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-destructive"
              onClick={handleRemove}
            >
              <Trash2 className="mr-1 h-4 w-4" />
              Remove
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
