import React, {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useReducer,
} from "react";
import { CartItem } from "@/features/cart/types";
import { Product } from "@/features/product/types";

type CartState = {
    items: CartItem[];
};

type CartContextValue = {
    items: CartItem[];
    totalItemsCount: number;
    selectedItems: CartItem[];
    selectedCount: number;
    selectedSubtotal: number;

    addToCart: (product: Product, quantity?: number) => void;
    removeFromCart: (productId: string) => void;
    increaseQty: (productId: string) => void;
    decreaseQty: (productId: string) => void;
    setQty: (productId: string, quantity: number) => void;

    toggleSelect: (productId: string) => void;
    selectAll: (value: boolean) => void;

    clearCart: () => void;
};

type Action =
    | { type: "ADD"; payload: { product: Product; quantity: number } }
    | { type: "REMOVE"; payload: { id: string } }
    | { type: "INC"; payload: { id: string } }
    | { type: "DEC"; payload: { id: string } }
    | { type: "SET_QTY"; payload: { id: string; quantity: number } }
    | { type: "TOGGLE_SELECT"; payload: { id: string } }
    | { type: "SELECT_ALL"; payload: { value: boolean } }
    | { type: "CLEAR" };

const initialState: CartState = {
    items: [],
};

function cartReducer(state: CartState, action: Action): CartState {
    switch (action.type) {
        case "ADD": {
            const { product, quantity } = action.payload;
            const idx = state.items.findIndex((i) => i.id === product.id);
            if (idx >= 0) {
                const items = state.items.slice();
                items[idx] = {
                    ...items[idx],
                    quantity: items[idx].quantity + quantity,
                };
                return { items };
            }
            return {
                items: [
                    ...state.items,
                    {
                        ...product,
                        quantity: Math.max(1, quantity),
                        selected: true,
                    },
                ],
            };
        }
        case "REMOVE": {
            return {
                items: state.items.filter((i) => i.id !== action.payload.id),
            };
        }
        case "INC": {
            return {
                items: state.items.map((i) =>
                    i.id === action.payload.id
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                ),
            };
        }
        case "DEC": {
            return {
                items: state.items.map((i) =>
                    i.id === action.payload.id
                        ? { ...i, quantity: Math.max(1, i.quantity - 1) }
                        : i
                ),
            };
        }
        case "SET_QTY": {
            const { id, quantity } = action.payload;
            return {
                items: state.items.map((i) =>
                    i.id === id
                        ? { ...i, quantity: Math.max(1, Math.floor(quantity)) }
                        : i
                ),
            };
        }
        case "TOGGLE_SELECT": {
            return {
                items: state.items.map((i) =>
                    i.id === action.payload.id
                        ? { ...i, selected: !i.selected }
                        : i
                ),
            };
        }
        case "SELECT_ALL": {
            return {
                items: state.items.map((i) => ({
                    ...i,
                    selected: action.payload.value,
                })),
            };
        }
        case "CLEAR": {
            return { items: [] };
        }
        default:
            return state;
    }
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const addToCart = useCallback((product: Product, quantity: number = 1) => {
        dispatch({ type: "ADD", payload: { product, quantity } });
    }, []);

    const removeFromCart = useCallback((productId: string) => {
        dispatch({ type: "REMOVE", payload: { id: productId } });
    }, []);

    const increaseQty = useCallback((productId: string) => {
        dispatch({ type: "INC", payload: { id: productId } });
    }, []);

    const decreaseQty = useCallback((productId: string) => {
        dispatch({ type: "DEC", payload: { id: productId } });
    }, []);

    const setQty = useCallback((productId: string, quantity: number) => {
        dispatch({ type: "SET_QTY", payload: { id: productId, quantity } });
    }, []);

    const toggleSelect = useCallback((productId: string) => {
        dispatch({ type: "TOGGLE_SELECT", payload: { id: productId } });
    }, []);

    const selectAll = useCallback((value: boolean) => {
        dispatch({ type: "SELECT_ALL", payload: { value } });
    }, []);

    const clearCart = useCallback(() => {
        dispatch({ type: "CLEAR" });
    }, []);

    const selectedItems = useMemo(
        () => state.items.filter((i) => i.selected),
        [state.items]
    );

    const selectedSubtotal = useMemo(
        () => selectedItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
        [selectedItems]
    );

    const value: CartContextValue = {
        items: state.items,
        totalItemsCount: state.items.reduce((sum, i) => sum + i.quantity, 0),
        selectedItems,
        selectedCount: selectedItems.reduce((sum, i) => sum + i.quantity, 0),
        selectedSubtotal,

        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        setQty,
        toggleSelect,
        selectAll,
        clearCart,
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return ctx;
}
