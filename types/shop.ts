export interface Shop {
    id: string;
    name: string;
    description?: string;
    coverPhotoUrl?: string;
    profilePhotoUrl?: string;
    ownerId: string;
}

export interface FullShopDetails extends Shop {
    owner: any;
}
