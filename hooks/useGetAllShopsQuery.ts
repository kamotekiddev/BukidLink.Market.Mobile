import { useQuery } from "@tanstack/react-query";
import { getAllShops } from "../services/marketplace";

export const useGetAllShopsQuery = () =>
    useQuery({
        queryFn: getAllShops,
        queryKey: ["shops"],
        select: (data) => data.data,
    });
