import {FollowRestaurantResponseDto} from "./dto/follow-restaurant-response.dto";
import {UserRestaurantFollow} from "./schemas/restaurant-follow.schema";

export class RestaurantFollowsMapper {

    static toFollowRestaurantResponseDto(follow: UserRestaurantFollow): FollowRestaurantResponseDto {
        return {
            _id: follow._id!.toString(),
            userId: follow.user.toString(),
            restaurantId: follow.restaurant.toString(),
        };
    }

}