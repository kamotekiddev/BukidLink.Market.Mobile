import React from "react";
import { ScrollView, Pressable, Text, View } from "react-native";

type Props = {
    categories: string[];
    active: string;
    onChange: (value: string) => void;
};

export default function CategoryFilter({
    categories,
    active,
    onChange,
}: Props) {
    return (
        <View className="mt-3">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row gap-2">
                    {categories.map((c) => {
                        const isActive = c === active;
                        return (
                            <Pressable
                                key={c}
                                onPress={() => onChange(c)}
                                className={`px-4 py-2 rounded-full border ${
                                    isActive
                                        ? "bg-green-600 border-green-600"
                                        : "bg-white border-gray-200"
                                }`}
                            >
                                <Text
                                    className={`${isActive ? "text-white" : "text-gray-700"} font-medium`}
                                >
                                    {c}
                                </Text>
                            </Pressable>
                        );
                    })}
                </View>
            </ScrollView>
        </View>
    );
}
