import { IAddress } from './address';

export interface IOrderToCreate {
    basketId: string;
    deliveryMethodId: number;
    shipToAddress: IAddress;
}

export interface IOrder {
    id: number;
    orderDate: string;
    shipToAddress: IAddress;
    deliveryMethod: string;
    shippingPrice: number;
    orderItems: IOrderItem[];
    subtotal: number;
    total: number;
    status: string;
    numberOrder: number;
    
  }
export interface IOrderItem {
   productId: number;
   productName: string;
   pictureUrl: string;
   price: number;
   quantity: number;
   width: number;
   height: number;
 }

 export interface IOrderAdmin {
   id: number;
   orderDate: string;
   numberOrder: number;
   name: string;
   deliveryMethod: string;
   total: number;
   shippingPrice: number;
 }
