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

  // Common
  getApiRoot() {
    return this.options.apiRoot || poster.DEFAULT_API_ROOT;
  }

  setAccessToken(accessToken: string) {
    this.options.accessToken = accessToken;
  }

  // Authorization
  getAuthorizationRedirectUrl() {
    const query = queryString.stringify({
      application_id: this.options.applicationId,
      redirect_uri: this.options.returnUrl,
      response_type: "code"
    });

    return urlJoin(this.getApiRoot(), `/api/auth?${query}`);
  }

  async getAccessToken(account: string, code: string) {
    const url = `https://${account}.joinposter.com/api/v2/auth/access_token`;

    const body = {
      application_id: this.options.applicationId,
      application_secret: this.options.applicationSecret,
      redirect_uri: this.options.returnUrl,
      code: code,
      grant_type: "authorization_code",
    }

    const options: client.RequestOptions = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
    return axios.post<poster.AccessTokenResponse>(url, body, options).then(result => result.data);
  }

  // Products
  async getProductById(id: string) {
    return this.preRun().then(accessToken => this._get<poster.ProductItem>(`/api/menu.getProduct?token=${accessToken}&product_id=${id}`));
  }

  // Categories
  async getCategoryById(id: string) {
    return this.preRun().then(accessToken => this._get<poster.CategoryItem>(`/api/menu.getCategory?token=${accessToken}&category_id=${id}`));
  }

  // Orders
  async createIncomingOrder(body: poster.OrderCreateRequest) {
    return this.preRun().then(accessToken => this._post<poster.OrderDetails>(`/api/incomingOrders.createIncomingOrder?token=${accessToken}`, body));
  }

  async getIncomingOrderById(id: string) {
    return this.preRun().then(accessToken => this._get<poster.OrderDetails>(`/api/incomingOrders.getIncomingOrder?token=${accessToken}&incoming_order_id=${id}`));
  }
}