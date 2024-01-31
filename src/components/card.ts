import { View } from "./base/view";
import { ensureElement, formatNumber } from "../utils/utils";
import { ProductCategory, cardCategories } from "../types";


export interface ICardView {
    id: string;
	title: string;
	about: string;
	image: string;
	price: number;
	category: string;
}

interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

export class Card extends View<ICardView> {
    protected _title: HTMLElement;
    protected _price: HTMLElement;
    protected _category?: HTMLElement;
    protected _image?: HTMLImageElement;
    protected _text?: HTMLElement;
    protected _button?: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: ICardActions) {  
        super(container);

        this._title = ensureElement<HTMLElement>(`.card__title`, container);
        this._price = ensureElement<HTMLElement>(`.card__price`, container);
        this._category = ensureElement<HTMLElement>(`.card__category`, container);
        this._image = ensureElement<HTMLImageElement>(`.card__image`, container);
        this._text = container.querySelector(`.card__text`);
        this._button = container.querySelector(`.card__button`);


        if (actions?.onClick) {
            if (this._button) {
                this._button.addEventListener('click', actions.onClick);
            } else {
                container.addEventListener('click', actions.onClick);
            }
        }
    }

    /* сеттер для id */

    set title(value: string) {
        this.setText(this._title, value);
    }

    set image(src: string) {
        this.setImage(this._image, src, this.title);
    }

    set about(value: string) {                        /* дописать возможность добавления массива строк при необходимости */
        this.setText(this._text, value);
    }

    set category(value: ProductCategory) {
        this.setText(this._category, value);
        this._category.classList.add(cardCategories[value]);
    }

    set price (value: number) {
        this.setText(this._price, value? `${formatNumber(value)} синапсов`: 'Бесценно');
    }

}