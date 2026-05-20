import {RestaurantResponseDto} from "./restaurant-response.dto";
import {ApiProperty} from "@nestjs/swagger";

export class NearbyRestaurantResponseDto extends RestaurantResponseDto {
    @ApiProperty({
        type: Number,
        description: 'Distance in meters'
    })
    distance?: number;
}