import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {RestaurantFollowsService} from './restaurant-follows.service';
import {FollowRestaurantRequestDto} from "./dto/follow-restaurant-request.dto";
import {Types} from "mongoose";
import {ParseObjectIdPipe} from "@nestjs/mongoose";
import {AppResponseDto} from "../../common/dto/app-response.dto";
import {MyFollowedRestaurantResponseDto} from "./dto/my-followed-restaurant-response.dto";

@Controller('api/v1/restaurant-follows')
export class RestaurantFollowsController {

    constructor(private readonly restaurantFollowsService: RestaurantFollowsService) {
    }

    @Post()
    followRestaurant(@Body() followRestaurantRequest: FollowRestaurantRequestDto) {
        return this.restaurantFollowsService.followRestaurant(followRestaurantRequest);
    }

    @Get('user/:userId')
    findMyFollowedRestaurants(
        @Param('userId', ParseObjectIdPipe) userId: Types.ObjectId,
    ): Promise<AppResponseDto<MyFollowedRestaurantResponseDto[]>> {
        return this.restaurantFollowsService.findMyFollowedRestaurants(userId);
    }
}
