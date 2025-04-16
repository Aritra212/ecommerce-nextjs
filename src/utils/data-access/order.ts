"use server";
import { ICartItem } from "@/common/common.interface";
import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";

export const placeOrder = async (
  produtcs: ICartItem[],
  user_id: string,
  amount: number
) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("order_history").insert({
    product_details: produtcs,
    user_id,
    amount,
  });

  if (error) return { error: error.message };

  revalidatePath("/cart");
  return { data };
};

export const fetchOrderHistory = async (user_id?: string) => {
  if (!user_id) return { error: "User Id required" };
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("order_history")
    .select("*")
    .eq("user_id", user_id);

  if (error) return { error: error.message };
  return { data };
};
