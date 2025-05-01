export type ProductResponse = {
    id: number;
    name: string;
    price: number;
    image: string;
    desc:string;
    recipe: string;
    created_at: string;
    updated_at: string;
}

export interface ResponseApi<T> {
    status_code: number;
    message: string;
    data: T[];
}

export interface SingleResponseApi<T> {
    status_code: number;
    message: string;
    data: T;
}

export interface BannerResponse {
    id: number;
    name: string;
    image: string;
    created_at: string;
    updated_at: string;
  }
