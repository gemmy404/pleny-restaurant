import {LocalizedNameDto} from "./localized-name.dto";
import {GeoPointDto} from "./geo-point.dto";
import {ApiProperty} from "@nestjs/swagger";

export class RestaurantResponseDto {
    @ApiProperty({type: String})
    _id: string;

    @ApiProperty({type: LocalizedNameDto})
    name: LocalizedNameDto;

    @ApiProperty({type: String})
    slug: string;

    @ApiProperty({type: String})
    cuisine: string[];

    @ApiProperty({type: GeoPointDto})
    location: GeoPointDto;
}