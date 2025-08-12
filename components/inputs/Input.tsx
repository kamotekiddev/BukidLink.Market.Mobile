import { View, TextInputProps, TextInput, Text } from "react-native";

interface Props extends TextInputProps {
    label?: string;
}

export default function Input({ label, ...props }: Props) {
    return (
        <View className="gap-y-2">
            {label && <Text>{label}</Text>}
            <TextInput
                className="w-full h-10 bg-gray-50 px-4 rounded-lg"
                {...props}
            />
        </View>
    );
}
