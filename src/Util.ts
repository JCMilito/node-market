import { Product } from './model/Product';

export function sortByName(products: Product[]): Product[] {
    return products.sort((a: Product, b: Product) => 
        (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));
}