import { TextInputProps } from "react-native";
import { Controller, useFormContext } from "react-hook-form";
import Input from "@/components/inputs/Input";

interface Props extends Omit<TextInputProps, "value" | "onChangeText"> {
    name: string;
    label?: string;
}

export default function FormInput({ name, ...props }: Props) {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            render={({ field, fieldState: { error } }) => (
                <Input
                    {...props}
                    value={field.value}
                    onBlur={field.onBlur}
                    onChangeText={field.onChange}
                    // errorMessage={error?.message}
                />
            )}
            name={name}
        />
    );
}
