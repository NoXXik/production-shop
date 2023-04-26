export interface User {
  id: string;
  email: string;
  phone: string;
  full_name: string;
  created_at: string;
  updated_at: string;
}

export interface UserOrderRefProduct {
  order_id: string;
  product_id: string;
  quantity: string;
  sum: number;
  cost: number;
  discount?: any;
}

export interface Delivery {
  id: string;
  city: number;
  cityName: string;
  tarif: number;
  price: string;
  term: number;
  address: string;
  addressComment: string;
  name: string;
  phone: string;
}

export interface Products {
  id: string;
  title: string;
  meta_title: string;
  title_translit: string;
  vendor_code: string;
  description: string;
  meta_description: string;
  category_name: string;
  category_id: number;
  product_filters: object;
  images: string[];
  currently_price: number;
  stock_count: number;
  stock_status: string;
  characteristics: any[];
  files: string[];
  rating: number;
  reviews_count: number;
  orders_count: number;
  discount?: any;
  new_label: boolean;
  hit_label: boolean;
  width: number;
  length: number;
  height: number;
  weight: number;
  created_at: string;
  updated_at: string;
  UserOrderRefProduct: UserOrderRefProduct;
}

export interface Order {
  id: string;
  invId: string;
  user_id: string;
  payment_status: string;
  delivery: Delivery;
  delivery_status: string;
  total_cost: number,
  created_at: string;
  updated_at: string;
  User: User;
  Products: Products[];
}

export interface OrderListResponse {
  count: number;
  rows: Order[];
}

export type DeliveryStatus = 'Ожидает отправки' | 'В пути' | 'Доставлен' | 'Отменен';
