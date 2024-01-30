import {View} from "./base/view";
// import {IEvents} from "./base/events";
import {ensureElement} from "../utils/utils";


interface IPage {
    catalog: HTMLElement[];
    locked: boolean;
} 


export class Page extends View<IPage> {
    protected _catalog: HTMLElement;
    protected _wrapper: HTMLElement;
    protected _basket: HTMLElement;
    protected _counter: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);

        this._catalog = ensureElement<HTMLElement>('.gallery');
        this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
        this._basket = ensureElement<HTMLElement>('.header__basket');
        this._counter = ensureElement<HTMLElement>('.header__basket-counter')
    }

    set catalog(items: HTMLElement[]) {
        this._catalog.replaceChildren(...items);
    }

    set locked(flag: boolean) {
        if (flag) {
            this._wrapper.classList.add('page__wrapper_locked');
        } else {
            this._wrapper.classList.remove('page__wrapper_locked');
        }
    }

}