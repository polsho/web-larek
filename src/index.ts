import './scss/styles.scss';

import { EventEmitter } from './components/base/events';
import { GetProductApi } from './components/getProductApi';
import { CDN_URL, API_URL } from './utils/constants';

const events = new EventEmitter();
const api = new GetProductApi(CDN_URL, API_URL);