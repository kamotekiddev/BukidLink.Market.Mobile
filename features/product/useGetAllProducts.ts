import { useQuery } from "@tanstack/react-query";
import { getAllProduct } from "@/services/product";

export const useGetAllProducts = () =>
    useQuery({ queryFn: getAllProduct, queryKey: ["produce"] });
