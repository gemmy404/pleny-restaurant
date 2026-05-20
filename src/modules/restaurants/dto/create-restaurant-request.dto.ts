import {ArrayMaxSize, ArrayMinSize, IsArray, IsNotEmpty, IsString, Length, ValidateNested} from "class-validator";
import {Type} from "class-transformer";
import {LocalizedNameDto} from "./localized-name.dto";
import {ApiProperty} from "@nestjs/swagger";
import {GeoPointDto} from "./geo-point.dto";

export class CreateRestaurantRequestDto {
    @ApiProperty({
        type: LocalizedNameDto,
        required: true,
    })
    @IsNotEmpty({message: 'Name is required'})
    @ValidateNested()
    @Type(() => LocalizedNameDto)
    name: LocalizedNameDto;

    @ApiProperty({
        type: String,
        required: true,
    })
    @IsNotEmpty({message: 'Slug is required'})
    @IsString({message: 'Slug must be a string'})
    @Length(1, 50, {
        message: 'Slug must be between 1 and 50 characters'
    })
    slug: string;

    @ApiProperty({
        type: [String],
        required: true,
    })
    @IsArray({message: 'Cuisine must be an array'})
    @ArrayMinSize(1, {message: 'At least one cuisine is required'})
    @ArrayMaxSize(3, {message: 'Maximum 3 cuisines are allowed'})
    @IsNotEmpty({each: true, message: 'Each cuisine is required'})
    @IsString({each: true, message: 'Each cuisine must be a string'})
    @Length(1, 50, {
        each: true,
        message: 'Cuisine must be between 1 and 50 characters'
    })
    cuisine: string[];

    @ApiProperty({
        type: GeoPointDto,
        required: true
    })
    @IsNotEmpty({message: 'Location is required'})
    @ValidateNested()
    @Type(() => GeoPointDto)
    location: GeoPointDto;
}