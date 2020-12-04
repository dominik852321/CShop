import { v4 as uuid} from 'uuid';

export interface IBasket {
    id: string;
    items: IBasketItem[];
    deliveryMethodId?: number;
    shippingPrice?: number;
  }

export interface IBasketItem {
    id: number;
    productName: string;
    price: number;
    quantity: number;
    pictureUrl: string;
    room: string;
    type: string;
    width: number;
    height: number;
 }

export class Basket implements IBasket{
     id = uuid();
     items: IBasketItem[] = [];
 }

export interface IBasketTotals {
   shipping: number;
   subtotal: number;
   total: number;
 }
