import {IEvents} from "./base/events";
import { IProduct, ProductCategory } from "../types";
import { ICardView } from "./card";
import { IOrderForm } from "../types";

export class ProductItem implements IProduct{
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
    basket: ProductItem[];
    totalPrice: number;
    order: {
        methodPayment: string;
        address: string;
    }

    constructor( protected events: IEvents) {
        this.basket = [];
    }

    setCatalog(items: IProduct[]) {
        this.catalog = items.map(item => new ProductItem(item, this.events));
        this.events.emit('items:show', { catalog: this.catalog });
    }

    setPreview(item: ProductItem) {
        this.preview = item.id;
        this.events.emit('preview:show', item);
    }

    addToBasket(item: ProductItem) {
        this.basket.push(item);
    }

    deleteFromBasket(item: ProductItem) {

    }

    setOrderField(field: keyof IOrderForm, value: string) {

    }


}