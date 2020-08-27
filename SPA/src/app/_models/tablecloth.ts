import { PhotoMaterial } from './photoMaterial';


export interface TableCloth {
    id: number;
    name: string;
    price: number;
    description: string;
    dateAdded: string;
    type: string;
    length: number;
    width: number;
    material1: string;
    material2: string;
    color1: string;
    color2: string;
    photoUrl: string;

    photoMaterial: PhotoMaterial[];
}