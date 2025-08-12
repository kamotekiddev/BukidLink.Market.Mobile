import { Produce } from "@/features/produce/types";

type ExtendedProduce = Produce & {
    imageUrl?: string;
    category?: string;
    isFeatured?: boolean;
    discountPercentage?: number;
    price?: number;
};

export const HOME_CATEGORIES = [
    "fresh",
    "frozen",
    "fruits",
    "vegetables",
    "herbs",
];

export const mockProducts: ExtendedProduce[] = [
    {
        id: "p1" as any,
        name: "Strawberries",
        category: "fruits",
        imageUrl:
            "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=800&auto=format&fit=crop",
        isFeatured: true,
        discountPercentage: 10,
        price: 4.99,
    },
    {
        id: "p2" as any,
        name: "Spinach",
        category: "vegetables",
        imageUrl:
            "https://images.unsplash.com/photo-1546470427-eaaabfd6cfb8?q=80&w=800&auto=format&fit=crop",
        isFeatured: true,
        discountPercentage: 0,
        price: 2.49,
    },
    {
        id: "p3" as any,
        name: "Frozen Peas",
        category: "frozen",
        imageUrl:
            "https://images.unsplash.com/photo-1526312426976-593c2b999c1f?q=80&w=800&auto=format&fit=crop",
        isFeatured: false,
        discountPercentage: 15,
        price: 3.29,
    },
    {
        id: "p4" as any,
        name: "Basil",
        category: "herbs",
        imageUrl:
            "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=800&auto=format&fit=crop",
        isFeatured: false,
        discountPercentage: 0,
        price: 1.99,
    },
    {
        id: "p5" as any,
        name: "Apples",
        category: "fruits",
        imageUrl:
            "https://images.unsplash.com/photo-1444858345149-8ff40887589b?q=80&w=800&auto=format&fit=crop",
        isFeatured: true,
        discountPercentage: 5,
        price: 2.99,
    },
    {
        id: "p6" as any,
        name: "Fresh Salmon",
        category: "fresh",
        imageUrl:
            "https://images.unsplash.com/photo-1552604617-28ef4f45f163?q=80&w=800&auto=format&fit=crop",
        isFeatured: false,
        discountPercentage: 8,
        price: 12.49,
    },
];
