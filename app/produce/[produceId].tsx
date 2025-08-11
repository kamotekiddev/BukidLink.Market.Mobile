import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Button, Image } from "@rneui/themed";

import { formatCurrency } from "@/utils";
import { useGetProduceById } from "@/features/produce/useGetProduceById";
import QuantityIncrementor from "@/components/QuantityIncrementor";

type SearchParams = {
    produceId: string;
};

const MIN_QUANTITY = 1;

export default function ProduceDetails() {
    const [quantity, setQuantity] = useState(1);
    const { produceId } = useLocalSearchParams<SearchParams>();
    const { data: produce } = useGetProduceById(produceId);

    if (!produce) return;

    const handleIncrement = () => setQuantity((prev) => prev + 1);
    const handleDecrement = () =>
        quantity > MIN_QUANTITY && setQuantity((prev) => prev - 1);

    return (
        <View style={styles.full}>
            <Image
                style={{ resizeMode: "cover", height: 300 }}
                source={{ uri: produce.photoUrl }}
            />
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{produce.name}</Text>
                    <Text style={styles.title}>
                        {formatCurrency(produce.price)}
                    </Text>
                </View>
                <Text>{produce.description}</Text>
            </View>
            <View style={styles.actionsContainer}>
                <QuantityIncrementor
                    quantity={quantity}
                    onIncrement={handleIncrement}
                    onDecrement={handleDecrement}
                />
                <Button title="Add to Cart" radius="xl" size="md" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    full: { flex: 1 },
    container: { padding: 10, rowGap: 10, flex: 1 },
    titleContainer: {
        flexDirection: "row",
        columnGap: 10,
        justifyContent: "space-between",
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
    },
    actionsContainer: {
        flexDirection: "row",
        position: "absolute",
        bottom: 0,
        padding: 10,
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
    },
});
