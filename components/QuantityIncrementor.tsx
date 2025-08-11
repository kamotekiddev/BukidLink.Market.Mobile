import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "@rneui/themed";

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
    return (
        <View style={styles.container}>
            <Button
                buttonStyle={styles.actionBtn}
                type="outline"
                onPress={onIncrement}
            >
                +
            </Button>
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
            <Button
                buttonStyle={styles.actionBtn}
                type="outline"
                onPress={onDecrement}
            >
                -
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        columnGap: 10,
    },
    actionBtn: {
        padding: 0,
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 30,
        borderRadius: 10,
    },
});
