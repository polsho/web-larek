export type ProductCategory = 'софт-скил' | 'хард-скил' | 'кнопка' | 'дополнительное' | 'другое';

export type CategoryClasses = Record<ProductCategory, string>;

export const cardCategories: CategoryClasses = {
    'софт-скил': 'card__category_soft',
    'хард-скил': 'card__category_hard',
    'кнопка': 'card__category_button',
    'дополнительное': 'card__category_additional',
    'другое': 'card__category_other',
}

export interface IProduct {
	id: string;
	title: string;
	description: string;
	image: string;
	price: number;
	category: ProductCategory;
}

export interface IOrderForm {
    methodPayment: string;
    address: string;
}