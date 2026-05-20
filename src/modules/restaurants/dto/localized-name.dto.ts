import {IsNotEmpty, IsString, Length} from "class-validator";

export class LocalizedNameDto {
    @IsNotEmpty({message: 'Arabic Name is required'})
    @IsString({message: 'Arabic Name must be a string'})
    @Length(1, 50, {
        message: 'Arabic Name must be between 1 and 50 characters'
    })
    ar: string;

    @IsNotEmpty({message: 'English Name is required'})
    @IsString({message: 'English Name must be a string'})
    @Length(1, 50, {
        message: 'English Name must be between 1 and 50 characters'
    })
    en: string;
}
