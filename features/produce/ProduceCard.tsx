import { Text, View, TouchableOpacity, Image } from "react-native";

import { Produce } from "@/features/produce/types";
import { formatCurrency } from "@/utils";

interface ProduceCardProps {
    produce: Produce;
    onPress: (produce: Produce) => void;
}

export default function ProduceCard({ produce, onPress }: ProduceCardProps) {
    return (
        <TouchableOpacity
            className="flex-1 bg-white rounded-2xl overflow-hidden"
            onPress={() => onPress(produce)}
        >
            <Image
                className="h-48"
                style={{ resizeMode: "cover" }}
                source={{ uri: produce.photoUrl }}
            />
            <View className="py-2 px-4 flex-row gap-x-4">
                <Text className="flex-1 font-bold">{produce.name}</Text>
                <Text className="font-bold">
                    {formatCurrency(produce.price)}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
