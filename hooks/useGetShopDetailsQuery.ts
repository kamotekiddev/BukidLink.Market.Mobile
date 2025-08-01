import { Shop } from "../types/shop";
import { useQuery } from "@tanstack/react-query";
import { getShopById } from "../services/marketplace";

export const useGetShopDetailsQuery = (shopId: Shop["id"]) =>
    useQuery({
        queryFn: () => getShopById(shopId),
        queryKey: ["shop", shopId],
        select: (data) => data.data,
    });
