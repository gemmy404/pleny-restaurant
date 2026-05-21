import {ApiProperty} from "@nestjs/swagger";

export class FollowRestaurantResponseDto {
    @ApiProperty({type: String})
    _id: string;

    @ApiProperty({type: String})
    userId: string;

    @ApiProperty({type: String})
    restaurantId: string;
}