import { Link } from "expo-router";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Icon } from "@rneui/themed";
import SearchBtn from "@/components/SearchBtn";
import ProduceList from "@/features/produce/ProduceList";

export default function ShopScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <SearchBtn />
                <Link href="/cart">
                    <Icon
                        type="feather"
                        name="shopping-cart"
                        color="#0A400C"
                        size={22}
                        style={styles.cartIcon}
                    />
                </Link>
            </View>
            <View style={styles.content}>
                <ProduceList />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#78C841" },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        columnGap: 20,
    },
    content: {
        flex: 1,
        backgroundColor: "white",
    },
    cartIcon: {
        width: 40,
        height: 40,
        backgroundColor: "white",
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
    },
});
