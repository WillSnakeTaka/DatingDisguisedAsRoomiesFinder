export interface BaseListingData {
    title: string;
    description: string;
    price: number;
    image_url?: string;
    location: string;
    category: string;
    is_active?: boolean;
    is_featured?: boolean;
}

export interface CreateListingData extends BaseListingData {
    clerkId: string;
    hobbyIds: number[];
}

export interface UpdateListingData extends Partial<BaseListingData> {
    hobbyIds?: number[];
}
