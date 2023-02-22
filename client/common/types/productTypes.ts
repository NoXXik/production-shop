import { IReadyFilter } from "./filterTypes";

// Интерфейс ответа от сервера на получение товаров
export interface IProducts {
  count: number;
  filters: IProductFilter[];
  products: IProduct[];
}

// export interface IProduct {
//   id: number;
//   price: number;
//   title: string;
//   createdAt: string;
//   updatedAt: string;
//   categoryId?: any;
//   category_name: string;
//   product_filters: object;
// }

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


// new product type

// [
//   {
//       "id": "7c84fb90-12c4-11e1-840d-7b35c4ee775a",
//       "title": "Видеокамера Optimus 2.8",
//       "meta_title": "Купить IP видеокамеру Optimus 2.8 в Казани",
//       "title_translit": "videokamera-optimus-2-8",
//       "vendor_code": "2345164",
//       "description": "Product description ....",
//       "meta_description": "Meta description",
//       "category_name": "kamery-ip-videonablyudeniya",
//       "product_filters": {
//           "cvet": "belyy"
//       },
//       "images": [
//           "image-name-1",
//           "image-2"
//       ],
//       "currently_price": 1596,
//       "stock_count": 10,
//       "stock_status": "В наличии",
//       "characteristics": [
//           {
//               "title": "Cvet",
//               "value": "Belyy"
//           }
//       ],
//       "files": [
//           "file-name-1",
//           "file-name-2"
//       ],
//       "rating": 0,
//       "reviews_count": 0,
//       "orders_count": 0,
//       "discount": {
//           "discount": 12,
//           "expirationDate": "2023-02-05 15:00:01.244+03",
//           "param": "percent"
//       },
//       "new_label": true,
//       "hit_label": false,
//       "createdAt": "2022-12-21T12:00:01.244Z",
//       "updatedAt": "2022-12-21T12:00:01.244Z",
//       "categoryId": 2
//   }
// ]

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
  createdAt: string;
  updatedAt: string;
  categoryId: number;
}

export interface IProductDiscount {
  discount: number;
  expirationDate: string;
  param: string;
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