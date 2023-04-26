import { IReadyFilter } from "./filterTypes";

// Интерфейс ответа от сервера на получение товаров
export interface IProducts {
  count: number;
  filters: IProductFilter[];
  products: IProduct[];
}

export interface CartProduct {
  id: string;
  count: number;
}

export interface IProductFilter {
  key: string;
  count: number;
  value: string;
}
// ================================

export interface IProductInitialState {
  products: IProduct[]
}


// ===========================
export interface IProductRequestData {
  category: string,
  sort: string,
  filters: [RequestDataFilter[]],
  limit: string,
  page: string
}

interface RequestDataFilter {
  key: string,
  value: string
}

// ==============================

export interface IPanelSettingsInitialState {
  sort: 'title_asc' | 'title_desc' | 'price_asc' | 'price_desc',
  page: number,
  maxPages: number,
  limit: 21 | 42,
  view: 'plate' | 'list'
}


export interface IProductResponse {
  count: number,
  products: IProduct[],
  filters: IReadyFilter[],

}

export interface IProduct {
  id: string;
  title: string;
  meta_title: string;
  title_translit: string;
  vendor_code: string;
  description: string;
  meta_description: string;
  category_name: string;
  product_filters: object;
  images: string[];
  currently_price: number;
  stock_count: number;
  stock_status: string;
  characteristics: IProductCharacteristic[];
  files: string[];
  rating: number;
  reviews_count: number;
  orders_count: number;
  discount: IProductDiscount;
  new_label: boolean;
  hit_label: boolean;
  width: number,
  length: number,
  height: number,
  weight: number,
  deleted: boolean,
  created_at: string;
  updated_at: string;
  category_id: number;
}

export interface ProductPageProps extends IProduct {
  RelProducts: IProduct[]
}

export interface IProductDiscount {
  discount: number;
  expirationDate: string;
  startDate: string;
}

export interface IProductCharacteristic {
  title: string;
  value: string;
}

// (
  // title,
  // meta_title,
  // title_translit,
  // vendor_code,
  // description,
  // meta_description,
  // category_name,
  // product_filters,
  // images,
  // currently_price,
  // stock_count,
  // stock_status,
  // characteristics,
  // files,
  // discount,
  // new_label,
  // hit_label,
  // "categoryId")
