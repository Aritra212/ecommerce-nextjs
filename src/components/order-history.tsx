"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
// import { ChevronRight } from "lucide-react";
import { IOrder } from "@/common/common.interface";
import { fetchOrderHistory } from "@/utils/data-access/order";
import useUser from "@/hooks/use-user";
import { toast } from "sonner";

export default function OrderHistory() {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    async function getOrderHistory() {
      const { data, error } = await fetchOrderHistory(user?.id);
      if (error) return toast.error(error);
      setOrders((data as unknown as IOrder[]) || []);
      setIsLoading(false);
    }

    getOrderHistory();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <div className="space-y-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="text-right">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="mt-1 h-4 w-20" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          You haven&apos;t placed any orders yet.
        </p>
        <Button asChild className="mt-4">
          <Link href="/products">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders?.map((order) => (
        <div
          key={order.id}
          className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
        >
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-medium">Oeder ID - {order.id}</h3>
              <Badge>{order.status}</Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {new Date(order.created_at).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-medium">${order.amount.toFixed(2)}</p>
              {/* <Button variant="link" size="sm" asChild className="h-auto p-0">
                <Link href={`/orders/${order.id}`}>View Details</Link>
              </Button> */}
            </div>
            {/* <ChevronRight className="h-5 w-5 text-muted-foreground" /> */}
          </div>
        </div>
      ))}
    </div>
  );
}
