import {ApiProperty} from "@nestjs/swagger";
import {IsOptional, IsString} from "class-validator";
import {PaginationQueryDto} from "../../../common/dto/pagination-query.dto";

export class GetRestaurantsQueryDto extends PaginationQueryDto {
    @ApiProperty({
        type: String,
        required: false,
    })
    @IsOptional()
    @IsString({message: 'Cuisine must be a string'})
    cuisine?: string;
}