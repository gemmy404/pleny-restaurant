import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {UserRestaurantFollow} from "./schemas/restaurant-follow.schema";
import {Model, Types} from "mongoose";

@Injectable()
export class RestaurantFollowsRepository {

    constructor(
        @InjectModel(UserRestaurantFollow.name)
        private readonly restaurantFollowModel: Model<UserRestaurantFollow>
    ) {
    }

    async createFollow(userRestaurantFollow: UserRestaurantFollow) {
        return this.restaurantFollowModel.create(userRestaurantFollow);
    }

    async findOneFollowByUserIdAndRestaurantId(userId: Types.ObjectId, restaurantId: Types.ObjectId) {
        return this.restaurantFollowModel.findOne({user: userId, restaurant: restaurantId});
    }

    async findMyFollowedRestaurantsByUserId(userId: Types.ObjectId) {
        return this.restaurantFollowModel.find({user: userId}, {user: 0})
            .sort({createdAt: -1})
            .populate({path: 'restaurant', select: 'name slug cuisine'});
    }

}
