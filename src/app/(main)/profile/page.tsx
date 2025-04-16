"use client";

import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Heart } from "lucide-react";
import ProfileForm from "@/components/forms/profile-form";
import OrderHistory from "@/components/order-history";
import WishlistItems from "@/components/wishlist-items";
import useUser from "@/hooks/use-user";
import { toast } from "sonner";
import { logout } from "@/utils/data-access/auth";

export default function ProfilePage() {
  const { user } = useUser();
  const router = useRouter();

  if (!user) {
    return router.push("/login");
  }

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

  return (
    <div className="container px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">My Account</h1>
          <Button variant="outline" onClick={handleLogout}>
            Log Out
          </Button>
        </div>

        <Tabs defaultValue="profile" className="mt-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your account details and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProfileForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center">
                <div>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>
                    View your past orders and their status
                  </CardDescription>
                </div>
                <ShoppingBag className="ml-auto h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <Separator />
              <CardContent className="pt-6">
                <OrderHistory />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wishlist" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center">
                <div>
                  <CardTitle>Wishlist</CardTitle>
                  <CardDescription>
                    Products you&apos;ve saved for later
                  </CardDescription>
                </div>
                <Heart className="ml-auto h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <Separator />
              <CardContent className="pt-6">
                <WishlistItems />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
