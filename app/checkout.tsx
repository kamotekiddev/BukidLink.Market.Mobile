import React, { useMemo, useState } from "react";
import {
    Alert,
    FlatList,
    Image,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type CartItem = {
    id: string;
    name: string;
    price: number; // unit price
    qty: number;
    imageUrl?: string;
};

type Address = {
    fullName: string;
    phone: string;
    line1: string;
    line2?: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
};

const addressSchema = z.object({
    fullName: z.string().min(2, "Full name is required"),
    phone: z.string().min(7, "Phone is required"),
    line1: z.string().min(3, "Address line is required"),
    line2: z.string().optional(),
    city: z.string().min(2, "City is required"),
    state: z.string().optional(),
    postalCode: z.string().min(3, "Postal code is required"),
    country: z.string().min(2, "Country is required"),
});

type AddressFormValues = z.infer<typeof addressSchema>;

// Mock cart data (replace with your cart state)
const mockCart: CartItem[] = [
    {
        id: "prod_1",
        name: "Organic Apples (1kg)",
        price: 3.99,
        qty: 2,
        imageUrl:
            "https://images.unsplash.com/photo-1560807707-8cc77767d783?q=80&w=400&auto=format&fit=crop",
    },
    {
        id: "prod_2",
        name: "Fresh Spinach (500g)",
        price: 2.49,
        qty: 1,
        imageUrl:
            "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400&auto=format&fit=crop",
    },
];

// Mock shipping fee for now
const MOCK_SHIPPING_FEE = 5.99;

export default function CheckoutScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const [cart] = useState<CartItem[]>(mockCart);
    const [address, setAddress] = useState<Address | null>(null);
    const [addressModalOpen, setAddressModalOpen] = useState(false);

    const subtotal = useMemo(
        () => cart.reduce((sum, item) => sum + item.price * item.qty, 0),
        [cart]
    );
    const shipping = MOCK_SHIPPING_FEE;
    const total = useMemo(() => subtotal + shipping, [subtotal]);

    const handleCheckout = () => {
        if (!address) {
            Alert.alert(
                "Add delivery address",
                "Please add your delivery address before checking out."
            );
            return;
        }
        // Replace with your actual checkout/integration flow
        Alert.alert("Success", "Your order has been placed!", [
            { text: "OK", onPress: () => router.back() },
        ]);
    };

    return (
        <SafeAreaView style={{ flex: 1 }} className="bg-white">
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 py-2 border-b border-gray-200">
                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Cancel checkout"
                    className="px-2 py-2 -ml-2"
                    onPress={() => router.back()}
                    testID="cancel-checkout"
                >
                    <Text className="text-base text-gray-700">Cancel</Text>
                </Pressable>
                <Text className="text-lg font-semibold text-gray-900">
                    Checkout
                </Text>
                <View className="w-12" />
            </View>

            {/* Content */}
            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.select({
                    ios: "padding",
                    android: undefined,
                })}
                keyboardVerticalOffset={Platform.select({ ios: 0, android: 0 })}
            >
                <ScrollView
                    className="flex-1"
                    contentContainerStyle={{
                        paddingBottom: 24 + insets.bottom,
                    }}
                >
                    {/* Cart Items */}
                    <View className="px-4 pt-4">
                        <Text className="text-base font-semibold text-gray-900 mb-3">
                            Your items
                        </Text>
                        <FlatList
                            data={cart}
                            keyExtractor={(item) => item.id}
                            scrollEnabled={false}
                            ItemSeparatorComponent={() => (
                                <View className="h-px bg-gray-200 my-3" />
                            )}
                            renderItem={({ item }) => (
                                <View className="flex-row items-center">
                                    <Image
                                        source={{
                                            uri:
                                                item.imageUrl ??
                                                "https://via.placeholder.com/80x80.png?text=Item",
                                        }}
                                        className="w-16 h-16 rounded-lg mr-3 bg-gray-100"
                                    />
                                    <View className="flex-1">
                                        <Text
                                            className="text-gray-900 font-medium"
                                            numberOfLines={2}
                                        >
                                            {item.name}
                                        </Text>
                                        <Text className="text-gray-500 mt-0.5">
                                            Qty: {item.qty}
                                        </Text>
                                    </View>
                                    <View className="items-end">
                                        <Text className="text-gray-900 font-semibold">
                                            $
                                            {Number(
                                                item.price * item.qty
                                            ).toFixed(2)}
                                        </Text>
                                        <Text className="text-gray-500 text-xs">
                                            ${item.price.toFixed(2)} ea
                                        </Text>
                                    </View>
                                </View>
                            )}
                            ListEmptyComponent={
                                <Text className="text-gray-500">
                                    Your cart is empty.
                                </Text>
                            }
                        />
                    </View>

                    {/* Delivery Address */}
                    <View className="px-4 mt-6">
                        <View className="flex-row items-center justify-between">
                            <Text className="text-base font-semibold text-gray-900">
                                Delivery address
                            </Text>
                            <Pressable
                                onPress={() => setAddressModalOpen(true)}
                                className="px-3 py-1.5 rounded-md bg-gray-900"
                                testID="edit-address"
                            >
                                <Text className="text-white font-medium">
                                    {address ? "Change" : "Add"}
                                </Text>
                            </Pressable>
                        </View>

                        {address ? (
                            <View className="mt-3 p-3 rounded-lg border border-gray-200 bg-gray-50">
                                <Text className="text-gray-900 font-medium">
                                    {address.fullName}
                                </Text>
                                <Text className="text-gray-700">
                                    {address.phone}
                                </Text>
                                <Text className="text-gray-700 mt-1">
                                    {address.line1}
                                </Text>
                                {address.line2 ? (
                                    <Text className="text-gray-700">
                                        {address.line2}
                                    </Text>
                                ) : null}
                                <Text className="text-gray-700">
                                    {address.city}
                                    {address.state
                                        ? `, ${address.state}`
                                        : ""}{" "}
                                    {address.postalCode}
                                </Text>
                                <Text className="text-gray-700">
                                    {address.country}
                                </Text>
                            </View>
                        ) : (
                            <Text className="text-gray-500 mt-2">
                                No address added yet. Tap “Add” to enter your
                                delivery details.
                            </Text>
                        )}
                    </View>

                    {/* Order Summary */}
                    <View className="px-4 mt-6">
                        <Text className="text-base font-semibold text-gray-900">
                            Order summary
                        </Text>
                        <View className="mt-3 space-y-2">
                            <Row
                                label="Subtotal"
                                value={`$${subtotal.toFixed(2)}`}
                            />
                            <Row
                                label="Shipping"
                                value={`$${shipping.toFixed(2)}`}
                                hint="(mocked)"
                            />
                            <View className="h-px bg-gray-200 my-2" />
                            <Row
                                label="Total"
                                value={`$${total.toFixed(2)}`}
                                strong
                            />
                        </View>
                    </View>
                </ScrollView>

                {/* Checkout Button (sticky) */}
                <View
                    className="px-4 pb-4 pt-3 border-t border-gray-200 bg-white"
                    style={{ paddingBottom: 12 + insets.bottom }}
                >
                    <Pressable
                        className="w-full py-4 rounded-lg bg-emerald-600 disabled:bg-gray-300"
                        onPress={handleCheckout}
                        disabled={cart.length === 0}
                        testID="submit-checkout"
                    >
                        <Text className="text-center text-white font-semibold text-base">
                            Checkout • ${total.toFixed(2)}
                        </Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>

            {/* Address Modal */}
            <AddressModal
                open={addressModalOpen}
                initialValues={address ?? undefined}
                onClose={() => setAddressModalOpen(false)}
                onSave={(values) => {
                    setAddress(values);
                    setAddressModalOpen(false);
                }}
            />
        </SafeAreaView>
    );
}

function Row({
    label,
    value,
    hint,
    strong,
}: {
    label: string;
    value: string;
    hint?: string;
    strong?: boolean;
}) {
    return (
        <View className="flex-row items-center justify-between">
            <Text
                className={`text-gray-600 ${strong ? "font-semibold text-gray-900" : ""}`}
            >
                {label}{" "}
                {hint ? <Text className="text-gray-400">{hint}</Text> : null}
            </Text>
            <Text className={`text-gray-900 ${strong ? "font-semibold" : ""}`}>
                {value}
            </Text>
        </View>
    );
}

function AddressModal({
    open,
    onClose,
    onSave,
    initialValues,
}: {
    open: boolean;
    onClose: () => void;
    onSave: (values: Address) => void;
    initialValues?: Address;
}) {
    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors },
    } = useForm<AddressFormValues>({
        resolver: zodResolver(addressSchema),
        defaultValues: initialValues ?? {
            fullName: "",
            phone: "",
            line1: "",
            line2: "",
            city: "",
            state: "",
            postalCode: "",
            country: "",
        },
        mode: "onBlur",
    });

    // Wire up manual registration for React Native inputs
    React.useEffect(() => {
        register("fullName");
        register("phone");
        register("line1");
        register("line2");
        register("city");
        register("state");
        register("postalCode");
        register("country");
    }, [register]);

    const onSubmit = (values: AddressFormValues) => {
        onSave({
            ...values,
            line2: values.line2?.trim() ? values.line2 : undefined,
            state: values.state?.trim() ? values.state : undefined,
        });
    };

    return (
        <Modal
            animationType="slide"
            visible={open}
            onRequestClose={onClose}
            presentationStyle="pageSheet"
        >
            <SafeAreaView className="flex-1 bg-white">
                <View className="flex-row items-center justify-between px-4 py-2 border-b border-gray-200">
                    <Pressable onPress={onClose} className="px-2 py-2 -ml-2">
                        <Text className="text-base text-gray-700">Close</Text>
                    </Pressable>
                    <Text className="text-lg font-semibold text-gray-900">
                        Delivery address
                    </Text>
                    <View className="w-12" />
                </View>

                <KeyboardAvoidingView
                    className="flex-1"
                    behavior={Platform.select({
                        ios: "padding",
                        android: undefined,
                    })}
                >
                    <ScrollView
                        className="flex-1 px-4 pt-4"
                        keyboardShouldPersistTaps="handled"
                    >
                        <Field
                            label="Full name"
                            error={errors.fullName?.message}
                            onChangeText={(t) =>
                                setValue("fullName", t, {
                                    shouldValidate: true,
                                })
                            }
                            defaultValue={initialValues?.fullName ?? ""}
                        />
                        <Field
                            label="Phone"
                            keyboardType="phone-pad"
                            error={errors.phone?.message}
                            onChangeText={(t) =>
                                setValue("phone", t, { shouldValidate: true })
                            }
                            defaultValue={initialValues?.phone ?? ""}
                        />
                        <Field
                            label="Address line 1"
                            error={errors.line1?.message}
                            onChangeText={(t) =>
                                setValue("line1", t, { shouldValidate: true })
                            }
                            defaultValue={initialValues?.line1 ?? ""}
                        />
                        <Field
                            label="Address line 2 (optional)"
                            error={errors.line2?.message}
                            onChangeText={(t) =>
                                setValue("line2", t, { shouldValidate: true })
                            }
                            defaultValue={initialValues?.line2 ?? ""}
                        />
                        <Field
                            label="City"
                            error={errors.city?.message}
                            onChangeText={(t) =>
                                setValue("city", t, { shouldValidate: true })
                            }
                            defaultValue={initialValues?.city ?? ""}
                        />
                        <Field
                            label="State/Region (optional)"
                            error={errors.state?.message}
                            onChangeText={(t) =>
                                setValue("state", t, { shouldValidate: true })
                            }
                            defaultValue={initialValues?.state ?? ""}
                        />
                        <Field
                            label="Postal code"
                            error={errors.postalCode?.message}
                            onChangeText={(t) =>
                                setValue("postalCode", t, {
                                    shouldValidate: true,
                                })
                            }
                            defaultValue={initialValues?.postalCode ?? ""}
                        />
                        <Field
                            label="Country"
                            error={errors.country?.message}
                            onChangeText={(t) =>
                                setValue("country", t, { shouldValidate: true })
                            }
                            defaultValue={initialValues?.country ?? ""}
                        />

                        <View className="h-6" />
                    </ScrollView>

                    <View className="px-4 pb-4 pt-3 border-t border-gray-200 bg-white">
                        <Pressable
                            className="w-full py-4 rounded-lg bg-gray-900"
                            onPress={handleSubmit(onSubmit)}
                            testID="save-address"
                        >
                            <Text className="text-center text-white font-semibold text-base">
                                Save address
                            </Text>
                        </Pressable>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </Modal>
    );
}

function Field({
    label,
    error,
    defaultValue,
    onChangeText,
    keyboardType,
}: {
    label: string;
    error?: string;
    defaultValue?: string;
    onChangeText: (t: string) => void;
    keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
}) {
    return (
        <View className="mb-4">
            <Text className="text-gray-800 mb-1">{label}</Text>
            <TextInput
                defaultValue={defaultValue}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                placeholder={label}
                className={`border rounded-lg px-3 py-3 text-gray-900 bg-white ${
                    error ? "border-red-400" : "border-gray-300"
                }`}
            />
            {error ? (
                <Text className="text-red-500 mt-1 text-sm">{error}</Text>
            ) : null}
        </View>
    );
}
