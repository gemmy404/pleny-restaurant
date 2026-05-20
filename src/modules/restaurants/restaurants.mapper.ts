import {RestaurantResponseDto} from "./dto/restaurant-response.dto";
import {Restaurant} from "./schemas/restaurants.schema";

export class RestaurantsMapper {

    static toRestaurantResponseDto(this: void, restaurant: Restaurant): RestaurantResponseDto {
        return {
            _id: restaurant._id!.toString(),
            name: restaurant.name,
            slug: restaurant.slug,
            cuisine: restaurant.cuisine,
            location: restaurant.location
        }
    }

}