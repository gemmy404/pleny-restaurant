import {RestaurantResponseDto} from "./dto/restaurant-response.dto";
import {Restaurant} from "./schemas/restaurants.schema";
import {NearbyRestaurantResponseDto} from "./dto/nearby-restaurant-response.dto";

export class RestaurantsMapper {

    static toRestaurantResponseDto(
        this: void,
        restaurant: Restaurant,
    ): RestaurantResponseDto | NearbyRestaurantResponseDto {
        const distance = restaurant.distance !== undefined
            ? Number(restaurant.distance.toFixed(0))
            : undefined;

        return {
            _id: restaurant._id!.toString(),
            name: restaurant.name,
            slug: restaurant.slug,
            cuisine: restaurant.cuisine,
            location: restaurant.location,
            distance: distance
        };
    }

}