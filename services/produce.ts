import { client } from "./client";

import { Produce } from "@/types/produce";

export const getAllProduce = () =>
    client.get<Produce[]>("/produce").then((res) => res.data);

export const getProduceById = (produceId: string) =>
    client.get<Produce>(`/produce/${produceId}`).then((res) => res.data);
