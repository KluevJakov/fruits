import { type TProductCard } from "./ProductCardType";
export declare interface TClientInfo {
    id: number,
    customerName: string,
    phoneCustomer: string,
    email: string,
    phoneReceiver: string,
    delivery: string,
    deliveryDate: string,
    address: string,
    comment: string,
    paymentMethod: string,

    bouquets: TProductCard[],
  }