export type ProductCategory = 'софт-скил' | 'хард-скил' | 'кнопка' | 'дополнительно' | 'другое';

export interface IProduct {
	id: string;
	title: string;
	description: string;
	image: string;
	price: number;
	category: string;
}