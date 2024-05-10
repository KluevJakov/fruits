import { type TProductCard } from "./ProductCardType";
export declare interface TClientInfo {
    id: number,
    name: string,
    tel: string,
    email: string,
    secondTel: string,
    delivery: string,
    date: string,
    time: string,
    address: string,
    comment: string,
    payment: string,

    products: TProductCard[],
  }