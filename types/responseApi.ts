export type ProductResponse = {
    id: number;
    name: string;
    price: number;
    image: string;
    recipe: string;
    created_at: string;
    updated_at: string;
}

export interface ResponseApi<T> {
    status_code: number;
    message: string;
    data: T[];
}
