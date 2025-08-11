import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";

export default function SearchBtn() {
    return (
        <TouchableOpacity style={{ flex: 1 }}>
            <View style={styles.container}>
                <Icon type="feather" name="search" />
                <Text style={{ flex: 1 }}>Search</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 40,
        paddingHorizontal: 10,
        backgroundColor: "white",
        alignItems: "center",
        borderRadius: 30,
        columnGap: 10,
    },
});
