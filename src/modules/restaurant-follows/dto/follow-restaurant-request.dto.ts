import {IsMongoId, IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class FollowRestaurantRequestDto {
    @ApiProperty({type: String})
    @IsNotEmpty({message: 'User ID is required'})
    @IsMongoId({message: 'User ID must be a valid MongoDB ObjectId'})
    userId: string;

    @ApiProperty({type: String})
    @IsNotEmpty({message: 'Restaurant ID is required'})
    @IsMongoId({message: 'Restaurant ID must be a valid MongoDB ObjectId'})
    restaurantId: string;
}