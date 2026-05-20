import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Types} from "mongoose";

@Schema({timestamps: true})
export class User {
    _id?: Types.ObjectId;

    @Prop({
        type: String,
        required: true
    })
    fullName: string;

    @Prop({
        type: [String],
        required: false,
        default: [],
    })
    favoriteCuisine: string[];
}

export const UsersSchema = SchemaFactory.createForClass(User);