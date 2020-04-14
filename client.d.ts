export namespace client {
  export interface RedirectUrlOptions {
    applicationId: string;
    returnUrl: string;
    account?: string;
  }

  export interface AuthOptions {
    applicationId: string;
    applicationSecret: string;
    returnUrl: string;
    account: string;
    code: string;
  }

  export interface ClientOptions {
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
