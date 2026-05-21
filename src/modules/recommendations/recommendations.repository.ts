import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model, Types} from "mongoose";
import {User} from "../users/schemas/users.schema";
import {RecommendationResponseDto} from "./dto/recommendation-response.dto";

@Injectable()
export class RecommendationsRepository {

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>
    ) {
    }

    async findRestaurantRecommendation(userId: Types.ObjectId): Promise<RecommendationResponseDto[]> {
        return this.userModel.aggregate([
                // Stage 1: Find the current user
                {
                    $match: {_id: userId},
                },

                // Stage 2: Find users who share the same Favorite cuisine
                {
                    $lookup: {
                        from: 'users',
                        let: {
                            favoriteCuisine: '$favoriteCuisine',
                            currentUserId: '$_id'
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            // Excludes the user who is requesting recommendations
                                            {
                                                $ne: ['$_id', '$$currentUserId']
                                            },

                                            {
                                                $gt: [
                                                    {
                                                        $size: {
                                                            $setIntersection: [
                                                                '$favoriteCuisine',
                                                                '$$favoriteCuisine'
                                                            ]
                                                        }
                                                    },
                                                    0
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        ], as: 'similarUsers'
                    }
                },

                // Stage 3: Extract user IDs from similarUsers
                {
                    $addFields: {
                        similarUserIds: {
                            $map: {
                                input: '$similarUsers',
                                as: 'user',
                                in: '$$user._id'
                            }
                        }
                    }
                },

                // Stage 4: Find follows for the similar users
                {
                    $lookup: {
                        from: 'userrestaurantfollows',
                        localField: 'similarUserIds',
                        foreignField: 'user',
                        as: 'follows'
                    }
                },

                // Stage 5: Extract restaurant IDs from follows
                {
                    $addFields: {
                        restaurantIds: {
                            $map: {
                                input: '$follows',
                                as: 'follow',
                                in: '$$follow.restaurant'
                            }
                        }
                    }
                },

                // Stage 6: Find recommended restaurants for the similar users
                {
                    $lookup: {
                        from: 'restaurants',
                        localField: 'restaurantIds',
                        foreignField: '_id',
                        as: 'recommendedRestaurants'
                    }
                },

                // Stage 7: Project the required fields
                {
                    $project: {
                        _id: 0,

                        similarUsers: {
                            _id: 1,
                            fullName: 1,
                            favoriteCuisine: 1
                        },

                        recommendedRestaurants: {
                            _id: 1,
                            name: 1,
                            slug: 1,
                            cuisine: 1
                        }
                    }
                }
            ],
        );
    }

}
