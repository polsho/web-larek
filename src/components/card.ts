import {View} from "./base/view";
import {ensureElement} from "../utils/utils";

type ProductCategory = 'софт-скил' | 'хард-скил' | 'кнопка' | 'дополнительно' | 'другое';

interface ICardView {
	title: string;
	about: string;
	image: string;
	price: number;
	category: ProductCategory;
}

interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

export class Card extends View<ICardView> {
    protected _title: HTMLElement;
    protected _category: HTMLElement;
    protected _image: HTMLImageElement;
    protected _price: HTMLElement;
    protected _text?: HTMLElement;
    protected _button?: HTMLButtonElement;

    constructor(container: HTMLElement, protected cardViewType: string, actions?: ICardActions) {  /* нужен ли аргумент cardViewType*/
        super(container);

        this._title = ensureElement<HTMLElement>(`.${cardViewType}__title`, container);
        this._category = ensureElement<HTMLElement>(`.${cardViewType}__category`, container);
        this._image = ensureElement<HTMLImageElement>(`.${cardViewType}__image`, container);
        this._price = ensureElement<HTMLElement>(`.${cardViewType}__price`, container);
        this._text = container.querySelector(`.${cardViewType}__text`);
        this._button = container.querySelector(`.${cardViewType}__button`);

        if (actions?.onClick) {
            if (this._button) {
                this._button.addEventListener('click', actions.onClick);
            } else {
                container.addEventListener('click', actions.onClick);
            }
        }
    }

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
        this.setText(this._title, value);
    }

    set price (value: string) {
        this.setText(this._price, value);
    }

}