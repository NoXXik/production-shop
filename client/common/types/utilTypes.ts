import {IProduct} from "./productTypes";
import {DeliveryInfo} from "./deliveryTypes";

export interface ICarousel {
    id: number;
    title: string;
    created_at: string;
    updated_at: string;
    Products: IProduct[];
};
export type Carousels = ICarousel[];


export interface SubmitOrder {
    full_name: string;
    phone: string;
    email: string;
    comment?: string;
    delivery: DeliveryInfo;
    products: { id: string, count: number }[]
}

export interface CreateSupportOrder {
    email: string;
    phone?: string;
    full_name: string;
    title: string;
    text: string;
}


