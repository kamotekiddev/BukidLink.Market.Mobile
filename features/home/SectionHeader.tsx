import React from "react";
import { View, Text } from "react-native";

interface Props {
    title: string;
    subtitle?: string;
}

export default function SectionHeader({ title, subtitle }: Props) {
    return (
        <View className="px-4 py-2">
            <Text className="text-lg font-semibold text-gray-900">{title}</Text>
            {subtitle ? (
                <Text className="text-gray-500">{subtitle}</Text>
            ) : null}
        </View>
    );
}
