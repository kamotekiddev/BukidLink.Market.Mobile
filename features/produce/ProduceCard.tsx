import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "@rneui/themed";

import { Produce } from "@/types/produce";
import { formatCurrency } from "@/utils";

interface ProduceCardProps {
    produce: Produce;
    onPress: (produce: Produce) => void;
}

export default function ProduceCard({ produce, onPress }: ProduceCardProps) {
    return (
        <TouchableOpacity style={styles.full} onPress={() => onPress(produce)}>
            <Card containerStyle={[styles.full, styles.container]}>
                <Card.Image
                    style={{ resizeMode: "cover" }}
                    source={{ uri: produce.photoUrl }}
                />
                <View style={styles.contentContainer}>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                        {produce.name}
                    </Text>
                    <Text>{formatCurrency(produce.price)}</Text>
                </View>
            </Card>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    full: { flex: 1 },
    container: {
        padding: 0,
        margin: 0,
        overflow: "hidden",
        borderRadius: 10,
    },
    contentContainer: {
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
    },
});
