import { useRouter } from "expo-router";
import { SafeAreaView, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";

import SearchBtn from "@/components/SearchBtn";
import ProduceList from "@/features/produce/ProduceList";

export default function ShopScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="size-full">
            <View className="flex-row gap-x-4 px-4">
                <SearchBtn />
                <TouchableOpacity
                    className="size-10 bg-white rounded-full items-center justify-center"
                    onPress={() => router.push("/cart")}
                >
                    <Icon name="shopping-cart" color="#0A400C" size={20} />
                </TouchableOpacity>
            </View>
            <View className="size-full">
                <ProduceList />
            </View>
        </SafeAreaView>
    );
}
