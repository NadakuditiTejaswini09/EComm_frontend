
export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
}
export interface cartItem extends Product{
    quantity : number;
}
    