import {IEvents} from "./base/events";
import { IProduct, ProductCategory } from "../types";

export class ProductItem {
    id: string;
	title: string;
	description: string;
	image: string;
	price: number;
	category: ProductCategory;

    constructor(data: IProduct, protected events: IEvents) {
        Object.assign(this, data);
    }
}

export class AppData {
    catalog: ProductItem[];
    preview: string | null;
    basket: string[];

    constructor( protected events: IEvents) {
        
    }

    setCatalog(items: IProduct[]) {
        this.catalog = items.map(item => new ProductItem(item, this.events));
        this.events.emit('items:changed', { catalog: this.catalog });
    }

    setPreview(item: ProductItem) {
        this.preview = item.id;
        this.events.emit('preview:changed', item);
    }

}