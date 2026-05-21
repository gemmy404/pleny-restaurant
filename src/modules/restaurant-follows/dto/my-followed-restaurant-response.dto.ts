import {ApiProperty} from "@nestjs/swagger";
import {RestaurantResponseDto} from "../../restaurants/dto/restaurant-response.dto";

export class MyFollowedRestaurantResponseDto {
    @ApiProperty({type: String})
    _id: string;

    @ApiProperty({type: RestaurantResponseDto})
    restaurant: Partial<RestaurantResponseDto>;
}