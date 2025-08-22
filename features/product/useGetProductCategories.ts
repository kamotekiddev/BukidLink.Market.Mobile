import { useQuery } from "@tanstack/react-query";
import { getProductCategories } from "@/services/product";

export const useGetProductCategories = () => {
    return useQuery({
        queryKey: ["product/categories"],
        queryFn: getProductCategories,
    });
};
