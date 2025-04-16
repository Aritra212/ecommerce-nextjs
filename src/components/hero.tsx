"use client";
import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  // return (
  //   <div className="w-full space-y-7">
  //     <div className="max-w-2xl mx-auto space-y-2  text-center">
  //       <h1 className="text-3xl  font-bold">
  //         Effortless Shopping. Curated Just for You.
  //       </h1>
  //       <p className="text-muted-foreground ">
  //         Explore premium products across every category with smart filters,
  //         quick views, and a seamless cart experience. Whether browsing or
  //         buying, everything&apos;s designed to make shopping feel effortless.
  //       </p>
  //     </div>
  //     <div className="flex justify-center gap-x-10 items-center">
  //       <div className="max-w-1/3 space-y-5">
  //         <h2 className="text-xl">A Smarter Way to Shop Online Today</h2>
  //         <p>
  //           Our ecommerce platform is built for the modern shopper — fast,
  //           responsive, and intuitive. From personalized recommendations to
  //           persistent carts and drag-and-drop features, everything is optimized
  //           to make buying easier. Your cart stays with you, your history is
  //           visualized, and your wishlist never gets lost. Start shopping
  //           smarter now.
  //         </p>
  //         <Link href={"/products"}>
  //           <Button>
  //             Explore Products <ChevronRight />
  //           </Button>
  //         </Link>
  //       </div>

  //       <div className="grid grid-cols-3 gap-1 items-center ">
  //         <div className="col-span-1 space-y-4">
  //           <ProductCard imageURL="/images/3.jpg" className="h-56" />
  //           <ProductCard
  //             imageURL="/images/2.png"
  //             className="h-56 bg-cyan-600"
  //           />
  //         </div>
  //         <div className="relative col-span-2 w-fit">
  //           <ProductCard
  //             imageURL="/images/1.jpg"
  //             className="w-[450px] h-[420px] "
  //           />
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="w-full space-y-7 py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-2xl mx-auto space-y-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
        >
          Effortless Shopping. Curated Just for You.
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-sm sm:text-base text-muted-foreground max-w-prose mx-auto"
        >
          Explore premium products across every category with smart filters,
          quick views, and a seamless cart experience. Whether browsing or
          buying, everything&apos;s designed to make shopping feel effortless.
          <div className="pt-2">
            <Link href="/products">
              <Button size="lg" className="group">
                Explore Products
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
