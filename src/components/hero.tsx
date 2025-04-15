import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import ProductCard from "./product-card";

export default function HeroSection() {
  return (
    <div className="w-full space-y-7">
      <div className="max-w-2xl mx-auto space-y-2  text-center">
        <h1 className="text-3xl  font-bold">
          Effortless Shopping. Curated Just for You.
        </h1>
        <p className="text-muted-foreground ">
          Explore premium products across every category with smart filters,
          quick views, and a seamless cart experience. Whether browsing or
          buying, everything&apos;s designed to make shopping feel effortless.
        </p>
      </div>
      <div className="flex justify-center gap-x-10 items-center">
        <div className="max-w-1/3 space-y-5">
          <h2 className="text-xl">A Smarter Way to Shop Online Today</h2>
          <p>
            Our ecommerce platform is built for the modern shopper — fast,
            responsive, and intuitive. From personalized recommendations to
            persistent carts and drag-and-drop features, everything is optimized
            to make buying easier. Your cart stays with you, your history is
            visualized, and your wishlist never gets lost. Start shopping
            smarter now.
          </p>
          <Button>
            Explore Products <ChevronRight />
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-1 items-center ">
          <div className="col-span-1 space-y-4">
            <ProductCard imageURL="/images/1.jpg" className="h-56" />
            <ProductCard imageURL="/images/2.png" className="h-56" />
          </div>
          <div className="relative col-span-2 w-fit">
            <ProductCard
              imageURL="/images/3.jpg"
              className="w-[450px] h-[420px] "
            />
          </div>
        </div>
      </div>
    </div>
  );
}
