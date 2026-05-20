import {IsLatitude, IsLongitude} from "class-validator";
import {Type} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class NearbyRestaurantQueryDto {
    @ApiProperty({
        type: Number,
        required: true,
        description: 'Latitude of the user',
    })
    @Type(() => Number)
    @IsLatitude({message: 'Latitude must be a valid latitude'})
    lat: number;

    @ApiProperty({
        type: Number,
        required: true,
        description: 'Longitude of the user',
    })
    @Type(() => Number)
    @IsLongitude({message: 'Longitude must be a valid longitude'})
    lng: number;
}