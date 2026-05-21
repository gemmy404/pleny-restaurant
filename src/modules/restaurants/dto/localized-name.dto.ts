import {IsNotEmpty, IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class LocalizedNameDto {
    @ApiProperty({
        type: String,
        required: true,
    })
    @IsNotEmpty({message: 'Arabic Name is required'})
    @IsString({message: 'Arabic Name must be a string'})
    @Length(1, 50, {
        message: 'Arabic Name must be between 1 and 50 characters'
    })
    ar: string;

    @ApiProperty({
        type: String,
        required: true,
    })
    @IsNotEmpty({message: 'English Name is required'})
    @IsString({message: 'English Name must be a string'})
    @Length(1, 50, {
        message: 'English Name must be between 1 and 50 characters'
    })
    en: string;
}
