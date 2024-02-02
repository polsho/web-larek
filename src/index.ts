import './scss/styles.scss';

import { ensureElement, cloneTemplate, createElement } from './utils/utils';
import { EventEmitter } from './components/base/events';
import { GetProductApi } from './components/getProductApi';
import { CDN_URL, API_URL } from './utils/constants';
import { Page } from './components/page';
import { AppData, ProductItem } from './components/appState';
import { IProduct } from './types';
import { Card } from './components/card';
import { Modal } from './components/common/modal';
import { Basket } from './components/common/basket';


const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');

const events = new EventEmitter();
const api = new GetProductApi(CDN_URL, API_URL);

const page = new Page(document.body, events);
const appData = new AppData(events);

const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(cloneTemplate(basketTemplate), events);




events.on<IProduct>('items:changed', () => {
    page.catalog = appData.catalog.map(item => {
        const card = new Card(cloneTemplate(cardCatalogTemplate), {
            onClick: () => events.emit('card:select', item)
        });
        return card.render({
            title: item.title,
            image: item.image,
            description: item.description,
            price: item.price,
            category: item.category,
            id: item.id
        });
    });
});

events.on('card:select', (item: ProductItem) => {
    appData.setPreview(item);
});

events.on('product:order', (item: ProductItem) => {
    appData.addToBasket(item);
    page.counter = appData.basket.length;
});

events.on('preview:changed', (item: ProductItem) => {
    const showItem = (item: ProductItem) => {
        const card = new Card(cloneTemplate(cardPreviewTemplate), {
            onClick: () => events.emit('product:order', item)
        });
        modal.render({
            content: card.render({
                title: item.title,
                image: item.image,
                description: item.description,
                price: item.price,
                category: item.category,
                id: item.id
            })
        });
    };

    if (item) {
        api.getProductInfo(item.id)
            .then((result) => {
                item.description = result.description;
                showItem(item);
            })
            .catch((err) => {
                console.error(err);
            })
    } else {
        modal.close();
    }
});

events.on('basket:open', () => {

    basket.items = appData.basket.map(item => {
        const card = new Card(cloneTemplate(cardBasketTemplate), {
            onClick: () => events.emit('card:delete', item)
        });
        return card.render({
            title: item.title,
            price: item.price,
            id: item.id
        });
    })
    modal.render({
        content: createElement<HTMLElement>('div', {}, [
            // tabs.render({
            //     selected: 'closed'
            // }),
            basket.render()
        ])
    });
});


events.on('modal:open', () => {
    page.locked = true;
});

events.on('modal:close', () => {
    page.locked = false;
});


api.getProductList()
.then((data) => {
    appData.setCatalog(data);
})
// .then(appData.setCatalog.bind(appData))
.catch(err => {
    console.error(err);
});
