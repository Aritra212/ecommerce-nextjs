import { CartProvider } from "@/utils/context/cart-context";
import { WishlistProvider } from "@/utils/context/wishlist-context";
import Footer from "@/components/footer";
import Header from "@/components/header";
import UserContextProvider from "@/components/user-context";
import { getCurrentUser } from "@/utils/data-access/auth";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <UserContextProvider userData={user}>
      <WishlistProvider>
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 container px-4 py-8 sm:px-6 sm:py-12 lg:px-8 mx-auto">
              {children}
            </main>
            <Footer />
          </div>
        </CartProvider>
      </WishlistProvider>
    </UserContextProvider>
  );
}
