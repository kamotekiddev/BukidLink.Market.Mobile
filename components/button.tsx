// components/ThemedButton.tsx
import { TouchableOpacity, Text } from "react-native";
import { tv } from "tailwind-variants";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ThemedButtonProps {
    title: string;
    onPress?: () => void;
    variant?: ButtonVariant;
    size?: ButtonSize;
}

// Define styles with cva
const buttonStyles = tv({
    base: "rounded-lg items-center justify-center flex-1 active:opacity-80", // base styles
    variants: {
        variant: {
            primary: "bg-green-600",
            secondary: "bg-gray-500",
            outline: "border border-green-600 bg-transparent",
        },
        size: {
            sm: "px-3 py-2",
            md: "px-4 py-3",
            lg: "px-5 py-4",
        },
    },
    defaultVariants: {
        variant: "primary",
        size: "md",
    },
});

const textStyles = tv({
    base: "font-medium",
    variants: {
        variant: {
            primary: "text-white",
            secondary: "text-white",
            outline: "text-green-600",
        },
        size: {
            sm: "text-sm",
            md: "text-base",
            lg: "text-lg",
        },
    },
    defaultVariants: {
        variant: "primary",
        size: "md",
    },
});

export default function ThemedButton({
    title,
    onPress,
    variant,
    size,
}: ThemedButtonProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            className={buttonStyles({ variant, size })}
        >
            <Text className={textStyles({ variant, size })}>{title}</Text>
        </TouchableOpacity>
    );
}
