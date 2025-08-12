import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import Ionicons from "react-native-vector-icons/Ionicons";

type Props = {
    title?: string;
    fallbackPath?: string;
    onClose?: () => void;
    right?: React.ReactNode;
};

export function CartHeader({
    title = "Cart",
    fallbackPath = "/",
    onClose,
    right,
}: Props) {
    const navigation = useNavigation<any>();
    const router = useRouter();

    const canGoBack = navigation?.canGoBack?.() ?? false;

    const handlePress = () => {
        if (canGoBack) {
            navigation.goBack();
            return;
        }
        if (onClose) {
            onClose();
            return;
        }
        router.replace(fallbackPath);
    };

    return (
        <View style={styles.container}>
            <Pressable
                onPress={handlePress}
                hitSlop={8}
                style={styles.left}
                accessibilityRole="button"
                accessibilityLabel={canGoBack ? "Go back" : "Close"}
            >
                <Ionicons
                    name={canGoBack ? "chevron-back" : "close"}
                    size={24}
                    color="#111827"
                />
            </Pressable>

            <Text numberOfLines={1} style={styles.title}>
                {title}
            </Text>

            <View style={styles.right}>{right}</View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 56,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        backgroundColor: "#ffffff",
        borderBottomWidth: 1,
        borderBottomColor: "#e5e7eb",
    },
    left: {
        width: 40,
        alignItems: "flex-start",
        justifyContent: "center",
    },
    title: {
        flex: 1,
        textAlign: "center",
        fontSize: 18,
        fontWeight: "700",
        color: "#111827",
    },
    right: {
        width: 40,
        alignItems: "flex-end",
        justifyContent: "center",
    },
});
