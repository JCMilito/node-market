import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { sortByName } from './Util';
import { nanoid } from 'nanoid';
import { Product } from './model/Product';

export class DAO {

    db = lowdb(new FileSync('db.json'));

    constructor() {
        this.db.defaults({ products: [] }).write();
    }

    listProducts(): Product[] {
        return sortByName(this.db.get('products').value()); 
    }

    findProduct(id: string): Product {
        // @ts-ignore        
        return this.db.get('products').find({ id }).value();
    }    

    createProduct(data: any): void {
        // @ts-ignore
        this.db.get('products').push(new Product(nanoid(), data.name, data.price)).write();
    }

    updateProduct(product: Product): void {
        // @ts-ignore
        this.db.get('products').find({ id: product.id }).
        assign({ name: product.name, price: product.price }).write();
    }

    deleteProduct(id: string): void {
        // @ts-ignore
        this.db.get('products').remove({ id: id }).write();
    }
}


