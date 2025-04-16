"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/utils/context/cart-context";
import { useWishlist } from "@/utils/context/wishlist-context";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { ModeToggle } from "@/components/mode-toggle";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  LogOut,
  Menu,
  // Search,
  ShoppingCart,
  User,
  // X,
} from "lucide-react";
import useUser from "@/hooks/use-user";
import Show from "./ui/show";
import { toast } from "sonner";
import { logout } from "@/utils/data-access/auth";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  // const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const [mounted, setMounted] = useState(false);

  const handleLogout = async () => {
    toast.loading("Logging out...");
    const { error } = await logout();

    if (error) {
      toast.dismiss();
      toast.error(error);
    }

    toast.dismiss();
    router.push("/login");
  };

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cartItemCount = mounted ? cart.length : 0;
  const wishlistItemCount = mounted ? wishlist.length : 0;

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "border-b bg-background/80 backdrop-blur-md"
          : "bg-background"
      }`}
    >
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4">
                <Link
                  href="/"
                  className="text-lg font-medium transition-colors hover:text-primary"
                >
                  Home
                </Link>
                <Link
                  href="/products"
                  className="text-lg font-medium transition-colors hover:text-primary"
                >
                  All Products
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="ml-4 md:ml-0">
            <h1 className="text-xl font-bold">PREMIUM SHOP</h1>
          </Link>

          <nav className="ml-8 hidden md:flex md:gap-4 lg:gap-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>
            <Link
              href="/products"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/products"
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              All Products
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {/* {isMobileSearchOpen ? (
            <div className="absolute inset-x-0 top-0 z-50 flex h-16 items-center gap-2 bg-background px-4 sm:px-6 lg:px-8">
              <Input
                type="search"
                placeholder="Search products..."
                className="flex-1"
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileSearchOpen(false)}
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close search</span>
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )} */}

          {/* <div className="hidden items-center md:flex">
            <form className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[300px]"
              />
            </form>
          </div> */}

          {/* <ModeToggle /> */}

          <Link href="/wishlist">
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5" />
              {wishlistItemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs"
                >
                  {wishlistItemCount}
                </Badge>
              )}
              <span className="sr-only">Wishlist</span>
            </Button>
          </Link>

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs"
                >
                  {cartItemCount}
                </Badge>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </Link>

          <Show when={!!user}>
            <>
              <Link href="/profile">
                <Button size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Profile</span>
                </Button>
              </Link>
              <Button variant={"ghost"} onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
                <span className="hidden sm:block">Log Out</span>
              </Button>
            </>
          </Show>

          <Show when={!user}>
            <Link href="/login">
              <Button size="sm">Log In</Button>
            </Link>
          </Show>
        </div>
      </div>
    </header>
  );
}
