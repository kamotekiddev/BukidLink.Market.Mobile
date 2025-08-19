import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/services/product";

export const useGetProductById = (produceId: string) =>
    useQuery({
        queryFn: () => getProductById(produceId),
        queryKey: ["produce", produceId],
    });
