import {ApiProperty} from "@nestjs/swagger";

export class PaginationDto {
    @ApiProperty({type: Number})
    totalElements: number;

    @ApiProperty({type: Number})
    totalPages: number;

    @ApiProperty({type: Number})
    currentPage: number;

    @ApiProperty({type: Number})
    size: number;

    @ApiProperty({type: Boolean})
    hasNextPage: boolean;

    @ApiProperty({type: Boolean})
    hasPrevPage: boolean;
}