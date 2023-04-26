import {IProduct} from "./productTypes";

export interface ISwiper {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
  Products: IProduct[];
};


export interface AdminData {
  id: string;
  login: string;
  email: string;
  first_name: string;
  last_name: string;
  access?: any;
  is_super_admin: boolean;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  data: AdminData;
  token: string;
}

export interface CreateAdminData {
  login: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  access?: any;
  is_super_admin: boolean;
}

export interface ChangeStatusSupportOrder {
  id: string;
  status: OrderStatusOptions
}

export type OrderStatusOptions = 'В обработке' | 'Отменен' | 'Завершен' | 'В очереди';

export interface SupportOrder {
  id: string;
  email: string;
  phone?: any;
  full_name: string;
  title: string;
  text: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface SupportOrderResponse {
  count: number;
  rows: SupportOrder[];
}
