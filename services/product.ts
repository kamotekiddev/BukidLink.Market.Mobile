import { client } from "./client";

import {
    Product,
    GetAllProductsParams,
    Category,
} from "@/features/product/types";

export const getAllProduct = (params?: GetAllProductsParams) =>
    client.get<Product[]>("/products", { params }).then((res) => res.data);

export const getProductById = (produceId: string) =>
    client.get<Product>(`/products/${produceId}`).then((res) => res.data);

export const getProductCategories = () =>
    client.get<Category[]>("/products/categories").then((res) => res.data);
