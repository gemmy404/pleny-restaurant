import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {RestaurantFollowsRepository} from "./restaurant-follows.repository";
import {FollowRestaurantRequestDto} from "./dto/follow-restaurant-request.dto";
import {Types} from "mongoose";
import {AppResponseDto} from "../../common/dto/app-response.dto";
import {FollowRestaurantResponseDto} from "./dto/follow-restaurant-response.dto";
import {HttpStatusText} from "../../common/enums/http-status-text.enum";
import {RestaurantFollowsMapper} from "./restaurant-follows.mapper";
import {UsersRepository} from "../users/users.repository";
import {RestaurantsRepository} from "../restaurants/restaurants.repository";
import {MyFollowedRestaurantResponseDto} from "./dto/my-followed-restaurant-response.dto";
import {Restaurant} from "../restaurants/schemas/restaurants.schema";
import {RestaurantsMapper} from "../restaurants/restaurants.mapper";

@Injectable()
export class RestaurantFollowsService {

    constructor(
        private readonly restaurantFollowsRepository: RestaurantFollowsRepository,
        private readonly usersRepository: UsersRepository,
        private readonly restaurantRepository: RestaurantsRepository,
    ) {
    }

    async followRestaurant(
        followRestaurantRequest: FollowRestaurantRequestDto
    ): Promise<AppResponseDto<FollowRestaurantResponseDto>> {
        const userId = new Types.ObjectId(followRestaurantRequest.userId);
        const restaurantId = new Types.ObjectId(followRestaurantRequest.restaurantId);

        const existingUser = await this.usersRepository
            .findUserById(userId);
        if (!existingUser) {
            throw new NotFoundException('User not found');
        }

        const existingRestaurant = await this.restaurantRepository
            .findRestaurantById(restaurantId);
        if (!existingRestaurant) {
            throw new NotFoundException('Restaurant not found');
        }

        const existingFollow = await this.restaurantFollowsRepository
            .findOneFollowByUserIdAndRestaurantId(userId, restaurantId);
        if (existingFollow) {
            throw new ConflictException('You have already followed this restaurant');
        }

        const createdFollow = await this.restaurantFollowsRepository
            .createFollow({
                user: userId,
                restaurant: restaurantId,
            });

        const appResponse: AppResponseDto<FollowRestaurantResponseDto> = {
            status: HttpStatusText.SUCCESS,
            data: RestaurantFollowsMapper.toFollowRestaurantResponseDto(createdFollow),
            message: 'You have successfully followed the restaurant'
        };

        return appResponse;
    }

    async findMyFollowedRestaurants(
        userId: Types.ObjectId
    ): Promise<AppResponseDto<MyFollowedRestaurantResponseDto[]>> {
        const existingUser = await this.usersRepository
            .findUserById(userId);
        if (!existingUser) {
            throw new NotFoundException('User not found');
        }

        const myFollowedRestaurants = await this.restaurantFollowsRepository
            .findMyFollowedRestaurantsByUserId(userId);

        const appResponse: AppResponseDto<MyFollowedRestaurantResponseDto[]> = {
            status: HttpStatusText.SUCCESS,
            data: myFollowedRestaurants.map(follow => ({
                _id: follow._id.toString(),
                restaurant: RestaurantsMapper.toRestaurantResponseDto(follow.restaurant as unknown as Restaurant),
            }))
        };

        return appResponse;
    }

}
