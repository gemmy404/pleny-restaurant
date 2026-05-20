import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Restaurant} from "./schemas/restaurants.schema";
import {Model, Types} from "mongoose";

@Injectable()
export class RestaurantsRepository {

    constructor(@InjectModel(Restaurant.name) private readonly restaurantModel: Model<Restaurant>) {
    }

    async createRestaurant(restaurant: Restaurant) {
        return this.restaurantModel.create(restaurant);
    }

    async findAllRestaurants(size: number, skip: number, cuisine?: string) {
        const filter = cuisine
            ? {cuisine: {$regex: cuisine, $options: 'i'}}
            : {};

        const [restaurants, totalElements] = await Promise.all([
            this.restaurantModel.find(filter)
                .sort({createdAt: -1})
                .limit(size)
                .skip(skip),
            this.restaurantModel.countDocuments(filter)
        ]);

        return {restaurants, totalElements};
    }

    async findRestaurantById(restaurantId: Types.ObjectId) {
        return this.restaurantModel.findById(restaurantId);
    }

    async findRestaurantBySlug(slug: string) {
        return this.restaurantModel.findOne({slug});
    }

}
