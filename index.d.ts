/// <reference types="./client" />
/// <reference types="./poster" />
export declare const DEFAULT_API_ROOT = "https://joinposter.com";
export declare class PosterApiClient {
    protected options: client.ClientOptions;
    constructor(options: client.ClientOptions);
    private _post;
    private _get;
    private preRun;
    private getApiRoot;
    static getAuthorizationRedirectUrl(options: client.RedirectUrlOptions): string;
    static getAccessToken(options: client.AuthOptions): Promise<poster.AccessTokenResponse>;
    getProducts(): Promise<poster.ProductItem[]>;
    getProductById(id: string | number): Promise<poster.ProductItem>;
    getCategories(): Promise<poster.CategoryItem[]>;
    getCategoryById(id: string | number): Promise<poster.CategoryItem>;
    createIncomingOrder(body: poster.OrderCreateRequest): Promise<poster.OrderDetails>;
    getIncomingOrderById(id: string | number): Promise<poster.OrderDetails>;
    getAllSettings(): Promise<poster.AllSettings>;
}
