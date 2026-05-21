import {UserResponseDto} from "../../users/dto/user-response.dto";
import {ApiProperty} from "@nestjs/swagger";
import {RestaurantResponseDto} from "../../restaurants/dto/restaurant-response.dto";

export class RecommendationResponseDto {
    @ApiProperty({type: UserResponseDto})
    similarUsers: UserResponseDto;

    recommendedRestaurants: Partial<RestaurantResponseDto>[];
}