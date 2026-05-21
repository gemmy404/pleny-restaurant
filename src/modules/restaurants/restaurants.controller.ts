import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {RestaurantsService} from './restaurants.service';
import {ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateRestaurantRequestDto} from "./dto/create-restaurant-request.dto";
import {GetRestaurantsQueryDto} from "./dto/get-restaurants-query.dto";
import {AppResponseDto} from "../../common/dto/app-response.dto";
import {RestaurantResponseDto} from "./dto/restaurant-response.dto";
import {NearbyRestaurantQueryDto} from "./dto/nearby-restaurant-query.dto";

@Controller('api/v1/restaurants')
@ApiTags('Restaurants')
export class RestaurantsController {

    constructor(private readonly restaurantsService: RestaurantsService) {
    }

    @Post()
    @ApiResponse({type: RestaurantResponseDto})
    createRestaurant(
        @Body() createRestaurantRequest: CreateRestaurantRequestDto
    ): Promise<AppResponseDto<RestaurantResponseDto>> {
        return this.restaurantsService.createRestaurant(createRestaurantRequest);
    }

    @Get()
    @ApiResponse({type: [RestaurantResponseDto]})
    findAllRestaurants(
        @Query() getRestaurantsQuery: GetRestaurantsQueryDto
    ): Promise<AppResponseDto<RestaurantResponseDto[]>> {
        return this.restaurantsService.findAllRestaurants(getRestaurantsQuery);
    }

    @Get('nearby')
    @ApiResponse({type: [RestaurantResponseDto]})
    findNearbyRestaurants(
        @Query() nearbyRestaurantsQuery: NearbyRestaurantQueryDto
    ): Promise<AppResponseDto<RestaurantResponseDto[]>> {
        return this.restaurantsService.findNearbyRestaurants(nearbyRestaurantsQuery);
    }

    // Endpoint to find a restaurant by ID or slug
    @Get(':identifier')
    @ApiResponse({type: RestaurantResponseDto})
    @ApiParam({
        name: 'identifier',
        description: 'The ID or slug of the restaurant',
        type: String,
    })
    findRestaurant(
        @Param('identifier') identifier: string
    ): Promise<AppResponseDto<RestaurantResponseDto>> {
        return this.restaurantsService.findRestaurant(identifier);
    }

}
