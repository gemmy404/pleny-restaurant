import {ArrayMaxSize, ArrayMinSize, IsArray, IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserRequestDto {
    @ApiProperty({
        type: String,
        required: true,
    })
    @IsNotEmpty({message: 'Full Name is required'})
    @IsString({message: 'Full Name must be a string'})
    fullName: string;

    @ApiProperty({
        type: [String],
        required: true,
    })
    @IsArray({message: 'Favorite cuisine must be an array'})
    @ArrayMinSize(1, {message: 'At least one favorite cuisine is required'})
    @ArrayMaxSize(100, {message: 'Maximum 100 favorite cuisines are allowed'})
    @IsNotEmpty({each: true, message: 'Each favorite cuisine is required'})
    @IsString({each: true, message: 'Each favorite cuisine must be a string'})
    favoriteCuisine: string[];
}