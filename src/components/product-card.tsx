import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import Show from "./ui/show";
import { Badge } from "./ui/badge";

type Props = {
  imageURL: string;
  discountBadge?: string;
  imageText?: string;
  children?: React.ReactNode;
  className?: string;
};

export default function ProductCard({
  imageURL,
  discountBadge,
  imageText,
  children,
  className,
}: Props) {
  return (
    <div className="w-fit">
      <div
        className={cn(
          "relative w-52 h-64 bg-primary/40 backdrop-blur-md rounded-md overflow-hidden",
          className
        )}
      >
        <Image src={imageURL} alt="Product Image" fill loading="lazy" />
        <Show when={!!discountBadge}>
          <Badge className="absolute top-1 left-1">{discountBadge}</Badge>
        </Show>
        <Show when={!!imageText}>
          <p className="absolute bottom-1 left-1">{imageText}</p>
        </Show>
      </div>
      {children}
    </div>
  );
}
