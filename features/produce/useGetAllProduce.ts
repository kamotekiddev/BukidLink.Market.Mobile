import { useQuery } from "@tanstack/react-query";
import { getAllProduce } from "@/services/produce";

export const useGetAllProduce = () =>
    useQuery({ queryFn: getAllProduce, queryKey: ["produce"] });
