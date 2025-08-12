import { useRouter } from "expo-router";
import { FlatList } from "react-native";

import { useGetAllProduce } from "./useGetAllProduce";
import ProduceCard from "./ProduceCard";

export default function ProduceList() {
    const router = useRouter();
    const { data: produce } = useGetAllProduce();

    return (
        <FlatList
            data={produce}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <ProduceCard
                    produce={item}
                    onPress={() => router.push(`/produce/${item.id}`)}
                />
            )}
            numColumns={2}
            columnWrapperStyle={{ gap: 10 }}
            contentContainerStyle={{ padding: 10 }}
        />
    );
}
