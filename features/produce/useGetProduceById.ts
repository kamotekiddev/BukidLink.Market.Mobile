import { useQuery } from "@tanstack/react-query";
import { getProduceById } from "@/services/produce";

export const useGetProduceById = (produceId: string) =>
    useQuery({
        queryFn: () => getProduceById(produceId),
        queryKey: ["produce", produceId],
    });
