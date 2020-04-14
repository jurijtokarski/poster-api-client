import queryString from "query-string";
import axios from "axios";
import urlJoin from "url-join";

import { client } from "./client";
import { poster } from "./poster";

export {
  client,
  poster
}

export class PosterApiClient {
  constructor(protected options: client.ClientOptions) { }

  private async _post<T>(path: string, body: any, options?: client.RequestOptions): Promise<T> {
    return axios.post<poster.Response<T>>(urlJoin(this.getApiRoot(), path), body, options).then(result => result.data.response);
  }

  private async _get<T>(path: string, options?: client.RequestOptions): Promise<T> {
    return axios.get<poster.Response<T>>(urlJoin(this.getApiRoot(), path), options).then(result => result.data.response);
  }

  private async preRun() {
    if (this.options.accessToken) {
      return Promise.resolve(this.options.accessToken);
    }

    throw new Error("accessToken does not exist in api client options");
  }

  private getApiRoot() {
    return this.options.apiRoot || poster.DEFAULT_API_ROOT;
  }

  // Authorization
  static getAuthorizationRedirectUrl(options: client.RedirectUrlOptions) {
    const url = options.account
      ? `https://${options.account}.joinposter.com/`
      : "https://joinposter.com/";

    const query = queryString.stringify({
      application_id: options.applicationId,
      redirect_uri: options.returnUrl,
      response_type: "code"
    });

    return urlJoin(url, `/api/auth?${query}`);
  }

  static async getAccessToken(options: client.AuthOptions) {
    const url = `https://${options.account}.joinposter.com/api/v2/auth/access_token`;

    const body = {
      application_id: options.applicationId,
      application_secret: options.applicationSecret,
      redirect_uri: options.returnUrl,
      code: options.code,
      grant_type: "authorization_code",
    }

    const requestOptions: client.RequestOptions = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
    return axios.post<poster.AccessTokenResponse>(url, body, requestOptions).then(result => result.data);
  }

  // Products
  async getProducts() {
    return this.preRun().then(accessToken => this._get<poster.ProductItem[]>(`/api/menu.getProducts?token=${accessToken}`));
  }

  async getProductById(id: string | number) {
    return this.preRun().then(accessToken => this._get<poster.ProductItem>(`/api/menu.getProduct?token=${accessToken}&product_id=${id}`));
  }

  // Categories
  async getCategories() {
    return this.preRun().then(accessToken => this._get<poster.CategoryItem[]>(`/api/menu.getCategories?token=${accessToken}`));
  }

  async getCategoryById(id: string | number) {
    return this.preRun().then(accessToken => this._get<poster.CategoryItem>(`/api/menu.getCategory?token=${accessToken}&category_id=${id}`));
  }

  // Orders
  async createIncomingOrder(body: poster.OrderCreateRequest) {
    return this.preRun().then(accessToken => this._post<poster.OrderDetails>(`/api/incomingOrders.createIncomingOrder?token=${accessToken}`, body));
  }

  async getIncomingOrderById(id: string | number) {
    return this.preRun().then(accessToken => this._get<poster.OrderDetails>(`/api/incomingOrders.getIncomingOrder?token=${accessToken}&incoming_order_id=${id}`));
  }

  // Settings
  async getAllSettings() {
    return this.preRun().then(accessToken => this._get<poster.AllSettings>(`/api/settings.getAllSettings?token=${accessToken}`));
  }
}