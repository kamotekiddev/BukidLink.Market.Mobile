import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Icon, useTheme } from "@rneui/themed";
import ThemedButton from "@/components/buttons/ThemedButton";

interface QuantityIncrementorProps {
    quantity: number;
    onIncrement: () => void;
    onDecrement: () => void;
}

export default function QuantityIncrementor({
    quantity,
    onDecrement,
    onIncrement,
}: QuantityIncrementorProps) {
    const { theme } = useTheme();

    return (
        <View style={[styles.container, {}]}>
            <ThemedButton
                radius="xl"
                size="md"
                variant="outline"
                buttonStyle={styles.actionBtn}
                titleStyle={styles.actionBtnText}
                onPress={onDecrement}
            >
                <Icon
                    type="feather"
                    name="minus"
                    size={18}
                    color={theme.colors.primary}
                />
            </ThemedButton>
            <Text
                style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    fontVariant: ["tabular-nums"],
                    minWidth: 20,
                    textAlign: "center",
                }}
            >
                {quantity}
            </Text>
            <ThemedButton
                radius="xl"
                size="md"
                variant="outline"
                titleStyle={styles.actionBtnText}
                buttonStyle={styles.actionBtn}
                onPress={onIncrement}
            >
                <Icon
                    type="feather"
                    name="plus"
                    color={theme.colors.primary}
                    size={18}
                />
            </ThemedButton>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        columnGap: 10,
        borderRadius: 40,
        padding: 5,
        justifyContent: "space-between",
    },
    actionBtn: {
        minWidth: 50,
    },
    actionBtnText: {
        fontSize: 14,
        fontWeight: "bold",
    },
});
