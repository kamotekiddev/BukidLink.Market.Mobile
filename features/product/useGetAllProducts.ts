import { useQuery } from "@tanstack/react-query";
import { getAllProduct } from "@/services/product";
import { GetAllProductsParams } from "@/features/product/types";

export const useGetAllProducts = (params?: GetAllProductsParams) =>
    useQuery({
        queryFn: () => getAllProduct(params),
        queryKey: ["products", params],
    });
