import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Types} from "mongoose";
import {User} from "../../users/schemas/users.schema";
import {Restaurant} from "../../restaurants/schemas/restaurants.schema";

@Schema({timestamps: true})
export class UserRestaurantFollow {
    _id?: Types.ObjectId;

    @Prop({
        type: Types.ObjectId,
        ref: User.name
    })
    user: Types.ObjectId;

    @Prop({
        type: Types.ObjectId,
        ref: Restaurant.name
    })
    restaurant: Types.ObjectId;
}

export const UserRestaurantFollowSchema = SchemaFactory.createForClass(UserRestaurantFollow);

UserRestaurantFollowSchema.index({user: 1, restaurant: 1}, {unique: true});