declare namespace poster {
  interface Response<T> {
    response: T;
  }

  // Authorization
  export interface AccessTokenResponse {
    access_token: string;
    account_number: string;
    user: {
      id: number;
      name: string;
      email: string;
      role_id: number;
    },
    ownerInfo: {
      email: string;
      phone: string;
      city: string;
      country: string;
      name: string;
      company_name: string;
    },
    tariff: {
      key: string;
      next_pay_date: string;
      price: number;
    }
  }

  // Restaurant settings
  export interface AllSettings {
    COMPANY_ID: string;
    FIZ_ADRESS_CITY: string;
    FIZ_ADRESS_PHONE: string;
    uses_tables: number;
    uses_cash_shifts: number;
    uses_taxes: number;
    uses_multiprice: number;
    tip_amount: number;
    uses_bookkeeping: number;
    uses_ipay: number;
    uses_manufacturing: number;
    uses_quick_waiter: number;
    company_name: string;
    company_type: number;
    timezones: string;
    logo: string;
    lang: string;
    pos_phone: string;
    analytics_plus_time: number;
    uses_fiscality: number;
    print_fiscal_by_default: number;
    currency: {
      currency_id: number;
      currency_name: string;
      currency_code: string;
      currency_symbol: string;
      currency_code_iso: string;
      country_code_iso: string;
    },
    email: string;
    name: string;
  }


  // Restaurant menu
  export interface ProductItemSpot {
    spot_id: string;
    price: string;
    profit: string;
    profit_netto: string;
    visible: string;
  }

  export interface ProductItemModification {
    modificator_id: string;
    modificator_name: string;
    modificator_selfprice: string;
    order: string;
    modificator_barcode: string;
    modificator_product_code: string;
    spots: ProductItemSpot[];
    ingredient_id: string;
  }

  export interface ProductItem {
    barcode: string;
    category_name: string;
    unit: string;
    cost: string;
    cost_netto: string;
    fiscal: string;
    menu_category_id: string;
    workshop: string;
    nodiscount: string;
    photo: string;
    photo_origin: string;
    product_code: string;
    product_id: string;
    product_name: string;
    sort_order: string;
    tax_id: string;
    product_tax_id: string;
    type: string;
    weight_flag: string;
    color: string;
    ingredient_id: string;
    cooking_time: string;
    modifications: ProductItemModification[],
    out: number;
    spots: ProductItemSpot[];
    product_production_description: string;
  }

  export interface CategoryItem {
    category_id: string;
    category_name: string;
    category_photo: string;
    parent_category: string;
    category_color: string;
    category_hidden: string;
    sort_order: string;
    fiscal: string;
    nodiscount: string;
    tax_id: string;
    left: string;
    right: string;
    level: string;
    category_tag: string;
  }

  // Order
  export interface OrderDetailsProduct {
    io_product_id: number;
    product_id: number;
    modificator_id: string | null;
    incoming_order_id: number;
    count: number;
    created_at: string;
  }

  export interface OrderDetails {
    incoming_order_id: number;
    spot_id: number;
    status: number;
    client_id: number;
    first_name: string | null;
    last_name: string | null;
    phone: string | null;
    email: string | null;
    sex: string | null;
    birthday: string | null;
    address: string | null;
    comment: string | null;
    created_at: string;
    updated_at: string;
    transaction_id: string | null;
    fiscal_spreading: number;
    fiscal_method: string;
    products: OrderDetailsProduct[];
  }

  export enum OrderPaymentType {
    NO_ONLINE_PAYMENT = 0,
    ONLINE_PAYMENT = 1
  }

  export interface OrderCreateRequestProduct {
    product_id: string;
    modificator_id?: string;
    count: number;
    price?: number;
  }

  export interface OrderCreateRequestPromotion {
    id: string;
    involved_products: {
      id: string;
      count: string;
      modification: string;
    }[];
    result_products: {
      id: string;
      count: string;
      modification: string;
    }[];
  }
  export interface OrderCreateRequest {
    spot_id: string;
    client_id?: string;
    first_name?: string;
    last_name?: string;
    phone: string;
    email?: string;
    sex?: 0 | 1 | 2;
    birthday?: string;
    address: string;
    comment: string;
    products: OrderCreateRequestProduct[];
    payment: {
      type: OrderPaymentType;
      sum: string;
      currency: string;
    };
    promotion?: OrderCreateRequestPromotion[]
  }

  // Webhooks
  export enum WebhookObject {
    TRANSACTION = "transaction",
    INCOMING_ORDER = "incoming_order",
    PRODUCT = "product",
    DISH = "dish",
    CATEGORY = "category"
  }

  export enum WebhookAction {
    ADDED = 'added',
    CHANGED = 'changed',
    REMOVED = 'removed',
    TRANSFORMED = 'transformed'
  }

  export interface WebhookDetails {
    account: string;
    account_number: string;
    object: WebhookObject;
    object_id: number;
    action: WebhookAction;
    time: string;
    verify: string;
    data: any;
  }
}