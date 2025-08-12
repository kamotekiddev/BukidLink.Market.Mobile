import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default function SearchBtn() {
    return (
        <TouchableOpacity className="flex-1">
            <View className="bg-white h-10 size-full flex-row items-center gap-x-4 px-4 rounded-full">
                <Icon name="search" size={20} />
                <Text style={{ flex: 1 }}>Search</Text>
            </View>
        </TouchableOpacity>
    );
}
