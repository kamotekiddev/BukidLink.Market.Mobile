import { useLocalSearchParams, useRouter } from "expo-router";
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import ThemedButton from "@/components/button";

import { formatCurrency } from "@/utils";
import { useGetProduceById } from "@/features/produce/useGetProduceById";

type SearchParams = {
    produceId: string;
};

export default function ProduceDetails() {
    const router = useRouter();
    const { produceId } = useLocalSearchParams<SearchParams>();
    const { data: produce } = useGetProduceById(produceId);

    if (!produce) return;

    return (
        <SafeAreaView className="h-full">
            <View className="justify-between flex-row items-center px-4 mb-4">
                <TouchableOpacity onPress={() => router.back()}>
                    <Icon name="arrow-left" color="#0A400C" size={20} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push(`/cart`)}>
                    <Icon name="shopping-cart" color="#0A400C" size={22} />
                </TouchableOpacity>
            </View>
            <ScrollView className="gap-y-4">
                <Image
                    className="h-64 object-cover"
                    source={{ uri: produce.photoUrl }}
                />
                <View className="p-4 gap-y-4">
                    <View className="flex-row justify-between">
                        <Text className="font-bold text-lg">
                            {produce.name}
                        </Text>
                        <Text className="font-bold text-lg">
                            {formatCurrency(produce.price)}
                        </Text>
                    </View>
                    <Text>{produce.description}</Text>
                </View>
            </ScrollView>
            <View className="absolute bottom-0 flex-row gap-x-4 p-4 w-full">
                <ThemedButton title="Add to Cart" variant="outline" />
                <ThemedButton
                    title="Buy Now"
                    onPress={() => router.push("/checkout")}
                />
            </View>
        </SafeAreaView>
    );
}
