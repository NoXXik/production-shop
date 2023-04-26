export interface ICategory {
    id: number;
    title: string;
    translit: string;
    parent_id?: number;
    created_at: string;
    updated_at: string;
    Filters?: IFilter[];
}

export interface IFilter {
    id: number;
    title: string;
    translit: string;
    values: FilterValue[];
    createdAt: string;
    updated_at: string;
    category_filter: ICategoryfilter;
}

export interface ICategoryfilter {
    id: number;
    category_id: number;
    filter_id: number;
    created_at: string;
    updated_at: string;
}

export interface FilterValue {
    value_title: string;
    value_translit: string;
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
    product_filters: object | null;
    images: string[];
    currently_price: number;
    stock_count: number;
    stock_status: string;
    characteristics: IProductCharacteristic[];
    files: string[];
    rating: number;
    reviews_count: number;
    orders_count: number;
    discount: IProductDiscount | null;
    new_label: boolean;
    hit_label: boolean;
    width: number;
    length: number;
    height: number;
    weight: number;
    deleted: boolean;
    created_at: string;
    updated_at: string;
    category_id: number;
}

export interface IProductFilters {
    title: string;
    value: string;
}


export interface IProductCharacteristic {
    title: string;
    value: string;
}


export interface IProductDiscount {
    discount: number;
    startDate: string;
    expirationDate: string;
}

export interface IProductCreateData {
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
    discount: IProductDiscount | null;
    new_label: boolean;
    hit_label: boolean;
    width: number;
    length: number;
    height: number;
    weight: number;

    category_id: number | null;
    related_products: string[];
}

export interface RelProducts {
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
    characteristics: IProductCharacteristic[];
    files: any[];
    rating: number;
    reviews_count: number;
    orders_count: number;
    discount: IProductDiscount | null;
    new_label: boolean;
    hit_label: boolean;
    width: number;
    length: number;
    height: number;
    weight: number;
    deleted: boolean;

    created_at: string;
    updated_at: string;
}

export interface ProductPageProps {
    id: string;
    title: string;
    meta_title: string;
    title_translit: string;
    vendor_code: string;
    description: string;
    meta_description: string;
    category_name: string;
    category_id: number;
    product_filters: Record<string, string> | null;
    images: string[];
    currently_price: number;
    stock_count: number;
    stock_status: string;
    characteristics: IProductCharacteristic[];
    files: string[];
    rating: number;
    reviews_count: number;
    orders_count: number;
    discount: IProductDiscount | null;
    new_label: boolean;
    hit_label: boolean;
    width: number;
    length: number;
    height: number;
    weight: number;
    deleted: boolean;

    created_at: string;
    updated_at: string;
    RelProducts: RelProducts[];
}

export interface UpdateProductDataProps extends IProductCreateData {
    id: string;
}

export interface CreateTemplate {
    title: string;
    template: IProductCharacteristic[];
}

export interface ProductTemplate {
    id: number;
    title: string;
    template: IProductCharacteristic[];
    created_at: string;
    updated_at: string;
}




