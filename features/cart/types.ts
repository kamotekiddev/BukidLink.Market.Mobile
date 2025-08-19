import { Product } from "@/features/product/types";

export type CartItem = Product & {
    quantity: number;
    selected: boolean;
};
