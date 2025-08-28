export interface Product {
    id: string;
    name: string;
    description?: string;
    photoUrl?: string;
    priceRange: number[];
}

export interface GetAllProductsParams {
    categoryId?: string;
    search?: string;
}

export type Category = {
    id: string;
    name: string;
};
