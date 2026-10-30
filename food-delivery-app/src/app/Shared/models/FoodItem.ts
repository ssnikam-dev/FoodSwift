export interface FoodItem {
    id?: number;
    itemName?: string;
    itemDescription?: string;
    isVeg?: boolean;
    /** Spring/Lombok serialises `boolean isVeg` as "veg" */
    veg?: boolean;
    price?: number;
    restaurantId?: number;
    quantity: number;
}
