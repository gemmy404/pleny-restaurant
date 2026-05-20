import {Injectable, NotFoundException} from '@nestjs/common';
import {UsersRepository} from "./users.repository";
import {CreateUserRequestDto} from "./dto/create-user-request.dto";
import {AppResponseDto} from "../../common/dto/app-response.dto";
import {UserResponseDto} from "./dto/user-response.dto";
import {HttpStatusText} from "../../common/enums/http-status-text.enum";
import {UsersMapper} from "./users.mapper";
import {PaginationQueryDto} from "../../common/dto/pagination-query.dto";
import {Types} from "mongoose";
import {constructPagination} from "../../common/utils/pagination.util";

@Injectable()
export class UsersService {

    constructor(private readonly usersRepository: UsersRepository) {
    }

    async createUser(createUserRequest: CreateUserRequestDto): Promise<AppResponseDto<UserResponseDto>> {
        const createdUser = await this.usersRepository
            .createUser(createUserRequest);

        const appResponse: AppResponseDto<UserResponseDto> = {
            status: HttpStatusText.SUCCESS,
            data: UsersMapper.toUserResponseDto(createdUser),
            message: 'User created successfully',
        };

        return appResponse;
    }

    async findAllUsers(paginationQuery: PaginationQueryDto) {
        const {page, size} = paginationQuery;
        const skip: number = (page - 1) * size;

        const {users, totalElements} = await this.usersRepository.findAllUsers(size, skip);

        const appResponse: AppResponseDto<UserResponseDto[]> = {
            status: HttpStatusText.SUCCESS,
            data: users.map(user => UsersMapper.toUserResponseDto(user)),
            pagination: constructPagination(totalElements, page, size)
        };

        return appResponse;
    }

    async findUserById(userId: Types.ObjectId) {
        const savedUser = await this.usersRepository.findUserById(userId);
        if (!savedUser) {
            throw new NotFoundException('User not found');
        }

        const appResponse: AppResponseDto<UserResponseDto> = {
            status: HttpStatusText.SUCCESS,
            data: UsersMapper.toUserResponseDto(savedUser),
        };

        return appResponse;
    }

}
