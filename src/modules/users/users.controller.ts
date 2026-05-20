import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserRequestDto} from "./dto/create-user-request.dto";
import {AppResponseDto} from "../../common/dto/app-response.dto";
import {UserResponseDto} from "./dto/user-response.dto";
import {ApiResponse, ApiTags} from "@nestjs/swagger";
import {Types} from "mongoose";
import {ParseObjectIdPipe} from "@nestjs/mongoose";
import {PaginationQueryDto} from "../../common/dto/pagination-query.dto";

@Controller('api/v1/users')
@ApiTags('Users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {
    }

    @Post()
    @ApiResponse({type: UserResponseDto})
    createUser(@Body() createUserRequest: CreateUserRequestDto): Promise<AppResponseDto<UserResponseDto>> {
        return this.usersService.createUser(createUserRequest)
    }

    @Get()
    findAllUsers(@Query() paginationQuery: PaginationQueryDto) {
        return this.usersService.findAllUsers(paginationQuery);
    }

    @Get(':userId')
    findUserById(@Param('userId', ParseObjectIdPipe) userId: Types.ObjectId) {
        return this.usersService.findUserById(userId);
    }

}
