import React from "react";
import { View, TextInput, Pressable, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

type Props = {
    query: string;
    onChangeQuery: (value: string) => void;
    cartCount: number;
    onPressCart: () => void;
};

export default function HomeHeader({
    query,
    onChangeQuery,
    cartCount,
    onPressCart,
}: Props) {
    return (
        <View className="flex-row items-center gap-3 mt-2">
            <View className="flex-1 flex-row items-center bg-gray-100 rounded-xl px-3">
                <Ionicons name="search" size={20} color="#6B7280" />
                <TextInput
                    value={query}
                    onChangeText={onChangeQuery}
                    placeholder="Search produce..."
                    placeholderTextColor="#9CA3AF"
                    className="flex-1 h-11 text-base text-gray-900 ml-2"
                    returnKeyType="search"
                />
            </View>

            <Pressable
                onPress={onPressCart}
                className="relative h-11 w-11 rounded-xl bg-green-600 items-center justify-center"
            >
                <Ionicons name="cart-outline" size={22} color="#fff" />
                {cartCount > 0 && (
                    <View className="absolute -top-1 -right-1 bg-red-500 rounded-full min-w-[18px] h-[18px] items-center justify-center px-1">
                        <Text className="text-white text-[10px] font-semibold">
                            {cartCount}
                        </Text>
                    </View>
                )}
            </Pressable>
        </View>
    );
}
