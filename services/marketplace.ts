import { client } from "./client";
import { FullShopDetails, Shop } from "../types/shop";

export const getAllShops = async () => client.get<Shop[]>("/store");
export const getShopById = async (shopId: string) =>
    client.get<FullShopDetails>(`/store/${shopId}`);
