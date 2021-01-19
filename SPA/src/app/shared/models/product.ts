export interface IProduct{
  id: number;
  name: string;
  price: number;
  description: string;
  dateAdded: string;
  productType: string;
  productRoom: string;
  productTypeId: number;
  productRoomId: number;
  height: number;
  width: number;
  color1: string;
  color2: string;
  material1: string;
  material2: string;
  pictureUrl: string;
  photos: IProductPhotos[];
}

export interface IProductPhotos {
  id: number;
  pictureUrl: string;
}

export interface IProductToEdit {
  
  name: string;
  price: number;
  description: string;
  productTypeId: number;
  productRoomId: number;
  height: number;
  width: number;
  color1: string;
  color2: string;
  material1: string;
  material2: string;
}

