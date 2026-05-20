import {ApiProperty} from "@nestjs/swagger";

export class UserResponseDto {
    @ApiProperty({
        type: String,
    })
    _id: string;

    @ApiProperty({
        type: String,
    })
    fullName: string;

    @ApiProperty({
        type: [String],
    })
    favoriteCuisine: string[];
}