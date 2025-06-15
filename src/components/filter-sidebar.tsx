"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Undo2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

type Props = {
  children: React.ReactNode;
};

export default function FilterSheet({ children }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  // Initialize filters from URL parameters
  useEffect(() => {
    const categories = searchParams.getAll("category");
    const colors = searchParams.getAll("color");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    if (categories.length > 0) {
      setSelectedCategories(categories);
    }

    if (colors.length > 0) {
      setSelectedColors(colors);
    }

    if (minPrice && maxPrice) {
      setPriceRange([parseInt(minPrice), parseInt(maxPrice)]);
    }
  }, [searchParams]);

  const categories = [
    { id: "electronics", label: "Electronics" },
    { id: "jewelery", label: "Jewelry" },
    { id: "men's clothing", label: "Men's Clothing" },
    { id: "women's clothing", label: "Women's Clothing" },
  ];

  const colors = [
    { id: "black", label: "Black" },
    { id: "white", label: "White" },
    { id: "red", label: "Red" },
    { id: "blue", label: "Blue" },
    { id: "green", label: "Green" },
  ];

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleColorChange = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);

    // Clear existing filters
    params.delete("category");
    params.delete("color");
    params.delete("minPrice");
    params.delete("maxPrice");

    // Add new filters
    selectedCategories.forEach((category) => {
      params.append("category", category);
    });

    selectedColors.forEach((color) => {
      params.append("color", color);
    });

    params.set("minPrice", priceRange[0].toString());
    params.set("maxPrice", priceRange[1].toString());

    router.push(`/products?${params.toString()}`);
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedColors([]);
    setPriceRange([0, 1000]);
    router.push("/");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="h-dvh overflow-y-auto py-6">
        <SheetHeader className="px-6 ">
          <SheetTitle>Apply Filters</SheetTitle>
        </SheetHeader>
        <div className="space-y-6 px-6 ">
          <Accordion
            type="multiple"
            defaultValue={["categories", "price", "colors"]}
          >
            <AccordionItem value="categories">
              <AccordionTrigger>Categories</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`category-${category.id}`}
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() =>
                          handleCategoryChange(category.id)
                        }
                      />
                      <Label
                        htmlFor={`category-${category.id}`}
                        className="text-sm font-normal"
                      >
                        {category.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="price">
              <AccordionTrigger>Price Range</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 mt-2">
                  <Slider
                    defaultValue={[0, 1000]}
                    max={1000}
                    step={10}
                    value={priceRange}
                    onValueChange={handlePriceChange}
                  />
                  <div className="flex items-center justify-between">
                    <div className="text-sm">${priceRange[0]}</div>
                    <div className="text-sm">${priceRange[1]}</div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="colors">
              <AccordionTrigger>Colors</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {colors.map((color) => (
                    <div key={color.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`color-${color.id}`}
                        checked={selectedColors.includes(color.id)}
                        onCheckedChange={() => handleColorChange(color.id)}
                      />
                      <Label
                        htmlFor={`color-${color.id}`}
                        className="text-sm font-normal"
                      >
                        {color.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex justify-between">
            <Button size="lg" onClick={applyFilters}>
              Apply Filters
            </Button>
            {(selectedCategories.length > 0 ||
              selectedColors.length > 0 ||
              priceRange[0] > 0 ||
              priceRange[1] < 1000) && (
              <Button
                size="lg"
                className="text-xs w-fit"
                onClick={resetFilters}
              >
                <Undo2 className="mr-1 h-4 w-4" />
                Reset
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
