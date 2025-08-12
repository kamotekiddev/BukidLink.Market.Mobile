import React, { useMemo } from "react";
import { Pressable } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { useCart } from "./useCart";

type Props = {
    size?: number;
    color?: string; // Optional explicit icon color
};

export function CartSelectAllButton({ size = 22, color }: Props) {
    const { items, selectAll } = useCart();

    const noItems = items.length === 0;
    const allSelected = useMemo(
        () => items.length > 0 && items.every((i) => i.selected),
        [items]
    );

    const iconName = allSelected ? "checkbox-outline" : "square-outline";

    // If a color prop is provided and we are not disabled, use it.
    // Otherwise, rely on tailwind classes for icon color.
    const iconColorProp = !noItems && color ? color : undefined;
    const iconClass = noItems
        ? "text-slate-400 opacity-50"
        : !color
          ? "text-slate-900"
          : undefined;

    return (
        <Pressable
            onPress={() => selectAll(!allSelected)}
            disabled={noItems}
            hitSlop={8}
            className={`rounded-lg p-1.5 ${noItems ? "opacity-50" : "active:opacity-80"}`}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: allSelected, disabled: noItems }}
            accessibilityLabel={
                noItems
                    ? "No items to select"
                    : allSelected
                      ? "Deselect all items"
                      : "Select all items"
            }
        >
            <Ionicons
                name={iconName}
                size={size}
                className={iconClass}
                color={iconColorProp}
            />
        </Pressable>
    );
}
