import { useState, type ReactNode } from "react";
import { View, TextInputProps, TextInput, Text } from "react-native";

interface Props extends TextInputProps {
    label?: string;
    required?: boolean;
    errorMessage?: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}

export default function Input({
    label,
    required,
    errorMessage,
    leftIcon,
    rightIcon,
    onFocus,
    onBlur,
    className,
    ...props
}: Props) {
    const [focused, setFocused] = useState(false);

    const handleFocus: NonNullable<TextInputProps["onFocus"]> = (e) => {
        setFocused(true);
        onFocus?.(e);
    };

    const handleBlur: NonNullable<TextInputProps["onBlur"]> = (e) => {
        setFocused(false);
        onBlur?.(e);
    };

    const borderColorClass = errorMessage
        ? "border-red-500"
        : focused
          ? "border-blue-500"
          : "border-gray-200";

    return (
        <View className="gap-y-1">
            {label ? (
                <Text className="text-gray-900">
                    {label}
                    {required ? <Text className="text-red-500"> *</Text> : null}
                </Text>
            ) : null}

            <View
                className={`w-full rounded-lg border bg-gray-50 px-3 ${borderColorClass} flex-row items-center ${className ?? ""}`}
            >
                {leftIcon ? <View className="mr-2">{leftIcon}</View> : null}

                <TextInput
                    {...props}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className="flex-1 py-2"
                />

                {rightIcon ? <View className="ml-2">{rightIcon}</View> : null}
            </View>

            {errorMessage ? (
                <Text className="text-xs text-red-500">{errorMessage}</Text>
            ) : null}
        </View>
    );
}
