import {Injectable, NotFoundException} from '@nestjs/common';
import {RestaurantsRepository} from "./restaurants.repository";
import {CreateRestaurantRequestDto} from "./dto/create-restaurant-request.dto";
import {AppResponseDto} from "../../common/dto/app-response.dto";
import {RestaurantResponseDto} from "./dto/restaurant-response.dto";
import {HttpStatusText} from "../../common/enums/http-status-text.enum";
import {RestaurantsMapper} from "./restaurants.mapper";
import {constructPagination} from "../../common/utils/pagination.util";
import {GetRestaurantsQueryDto} from "./dto/get-restaurants-query.dto";
import {isValidObjectId, Types} from "mongoose";
import {Restaurant} from "./schemas/restaurants.schema";

@Injectable()
export class RestaurantsService {

    constructor(private readonly restaurantsRepository: RestaurantsRepository) {
    }

    async createRestaurant(
        createRestaurantRequest: CreateRestaurantRequestDto
    ): Promise<AppResponseDto<RestaurantResponseDto>> {
        const createdRestaurant = await this.restaurantsRepository
            .createRestaurant(createRestaurantRequest);

        const appResponse: AppResponseDto<RestaurantResponseDto> = {
            status: HttpStatusText.SUCCESS,
            data: RestaurantsMapper.toRestaurantResponseDto(createdRestaurant),
            message: 'Restaurant created successfully',
        };

        return appResponse;
    }

    async findAllRestaurants(
        getRestaurantsQuery: GetRestaurantsQueryDto
    ): Promise<AppResponseDto<RestaurantResponseDto[]>> {
        const {page, size, cuisine} = getRestaurantsQuery;
        const skip: number = (page - 1) * size;

        const {restaurants, totalElements} = await this.restaurantsRepository
            .findAllRestaurants(size, skip, cuisine);

        const appResponse: AppResponseDto<RestaurantResponseDto[]> = {
            status: HttpStatusText.SUCCESS,
            data: restaurants.map(RestaurantsMapper.toRestaurantResponseDto),
            pagination: constructPagination(totalElements, page, size)
        };

        return appResponse;
    }

    async findRestaurant(identifier: string): Promise<AppResponseDto<RestaurantResponseDto>> {
        let savedRestaurant: Restaurant | null;

        // Check if the identifier is a valid ObjectId or a slug
        if (isValidObjectId(identifier)) {
            savedRestaurant = await this.restaurantsRepository.findRestaurantById(
                new Types.ObjectId(identifier)
            );
        } else {
            savedRestaurant = await this.restaurantsRepository.findRestaurantBySlug(identifier);
        }

        if (!savedRestaurant) {
            throw new NotFoundException('Restaurant not found')
        }

        const appResponse: AppResponseDto<RestaurantResponseDto> = {
            status: HttpStatusText.SUCCESS,
            data: RestaurantsMapper.toRestaurantResponseDto(savedRestaurant)
        };

        return appResponse;
    }
}
