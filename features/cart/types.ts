import { Produce } from "../produce/types";

export type CartItem = Produce & {
    quantity: number;
    selected: boolean;
};
