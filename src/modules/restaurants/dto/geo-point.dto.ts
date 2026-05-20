import {ApiProperty} from "@nestjs/swagger";
import {ArrayMaxSize, ArrayMinSize, Equals, IsArray, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class GeoPointDto {
    @ApiProperty({
        example: 'Point'
    })
    @IsNotEmpty({message: 'Type is required'})
    @IsString({message: 'Type must be a string'})
    @Equals('Point')
    type: 'Point';

    // Coordinates equivalent to [longitude, latitude]
    @ApiProperty({
        type: [Number],
        example: [31.2357, 30.0444]
    })
    @IsNotEmpty({message: 'Coordinates are required'})
    @IsArray({message: 'Coordinates must be an array'})
    @ArrayMinSize(2, {message: 'Coordinates must be an array of length 2'})
    @ArrayMaxSize(2, {message: 'Coordinates must be an array of length 2'})
    @IsNumber({}, {each: true, message: 'Coordinates must be an array of numbers'})
    coordinates: [number, number];
}