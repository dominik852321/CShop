import { PhotoMaterial } from './photoMaterial';


export interface Curtain {
    id: number;
    name: string;
    price: number;
    description: number;
    dateAdded: string;
    height: number;
    width: number;
    room: string;
    stickOn: string;
    color1: string;
    color2: string;
    material1: string;
    material2: string;
    material3: string;
    photoUrl: string;

    photoMaterial: PhotoMaterial[];
}