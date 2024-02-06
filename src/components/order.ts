import { Form } from "./common/form";
import { IOrder } from "../types";
import { IEvents } from "./base/events";


export class Order extends Form<Pick<IOrder, 'address'>> {
    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
    }

    set methodPayment(value: string) {
        (this.container.elements.namedItem('card') as HTMLInputElement).value = value;
        (this.container.elements.namedItem('cash') as HTMLInputElement).value = value;
    }

    set address(value: string) {
        (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
    }
}