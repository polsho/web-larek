import { Api, ApiListResponse } from "./base/api";
import { IProduct } from "../types";

interface IGetProductApi {
    getProductList: () => Promise<IProduct[]>
    getProductInfo: (id: string) => Promise<IProduct>
}

export class GetProductApi extends Api implements IGetProductApi {
    readonly cdn: string;

    constructor(cdn: string, baseUrl: string, options: RequestInit = {}) {
        super(baseUrl, options);
        this.cdn = cdn;
    }

    getProductList(): Promise<IProduct[]> {
        return this.get('/product/').then((data: ApiListResponse<IProduct>) =>
            data.items.map((item) => ({
                ...item,
                image: this.cdn + item.image
            }))
        );
        
    } 

    getProductInfo(id: string): Promise<IProduct> {
        return this.get(`/product/${id}`).then(
            (item: IProduct) => ({
                ...item,
                image: this.cdn + item.image,
            })
        );
    }
}