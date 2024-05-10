
export declare interface TProductCard {
    id: number, 
    name: string,
    img: string,
    quantity: number,

    composition: composition[],
    description: string,
    section: string,
    price: string,
  }

  type composition = {
    id: number,
    name: string,
  }