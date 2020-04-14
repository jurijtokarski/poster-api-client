export namespace client {
  export interface ClientOptions {
    applicationId: string;
    applicationSecret: string;
    returnUrl: string;
    apiRoot?: string;
    accessToken?: string;
  }

  export interface RequestOptions {
    headers?: { [key: string]: string | number };
    body?: any;
    maxRedirects?: number;
    validateStatus?: (status: number) => boolean;
  }
}
