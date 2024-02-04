export type ProductCategory = 'софт-скил' | 'хард-скил' | 'кнопка' | 'дополнительное' | 'другое';

export type CategoryClasses = Record<ProductCategory, string>;

export interface IProduct {
	id: string;
	title: string;
	description: string;
	image: string;
	price: number | null;
	category: ProductCategory;
}

export interface IPage {
	catalog: HTMLElement[];
    locked: boolean;
} 

export interface IModalView {
	content: HTMLElement;
}

export interface IBasketView {
	items: HTMLElement[];
    total: number;   
    selected: string[];
}

export interface IFormState {
    valid: boolean;
    errors: string[];
}

export interface IOrderForm {
	methodPayment: string;
	address: string;
}

export interface IContactsForm {
	email: string;
	phone: string;
}

export interface IOrder {
	items: string[];
}

export interface IOrderResult {
	id: string;
	total: number;
}

export interface ISuccess {
    total: number;
}
