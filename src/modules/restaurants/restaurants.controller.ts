import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {RestaurantsService} from './restaurants.service';
import {ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateRestaurantRequestDto} from "./dto/create-restaurant-request.dto";
import {GetRestaurantsQueryDto} from "./dto/get-restaurants-query.dto";
import {AppResponseDto} from "../../common/dto/app-response.dto";
import {RestaurantResponseDto} from "./dto/restaurant-response.dto";

@Controller('api/v1/restaurants')
@ApiTags('Restaurants')
export class RestaurantsController {

    constructor(private readonly restaurantsService: RestaurantsService) {
    }

    @Post()
    createRestaurant(@Body() createRestaurantRequest: CreateRestaurantRequestDto) {
        return this.restaurantsService.createRestaurant(createRestaurantRequest);
    }

    @Get()
    @ApiResponse({type: [RestaurantResponseDto]})
    findAllRestaurants(
        @Query() getRestaurantsQuery: GetRestaurantsQueryDto
    ): Promise<AppResponseDto<RestaurantResponseDto[]>> {
        return this.restaurantsService.findAllRestaurants(getRestaurantsQuery);
    }

    // Endpoint to find a restaurant by ID or slug
    @Get(':identifier')
    @ApiResponse({type: RestaurantResponseDto})
    findRestaurant(
        @Param('identifier') identifier: string
    ): Promise<AppResponseDto<RestaurantResponseDto>> {
        return this.restaurantsService.findRestaurant(identifier);
    }

}
