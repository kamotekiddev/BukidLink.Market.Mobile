import { client } from "./client";

import { Product } from "@/features/product/types";

export const getAllProduct = () =>
    client.get<Product[]>("/produce").then((res) => res.data);

export const getProductById = (produceId: string) =>
    client.get<Product>(`/produce/${produceId}`).then((res) => res.data);
