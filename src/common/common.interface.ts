export interface LogoutProps {
  noredirect: boolean;
}

export interface IProfile {
  name: string;
  email: string;
  created_at: string;
  phone?: string;
}

export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

export interface ICartItem extends IProduct {
  quantity: number;
}

export interface IUser {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  address?: string;
}

export interface IOrder {
  id: string;
  userId: string;
  product_details: ICartItem[];
  amount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "Done";
  created_at: string;
}
