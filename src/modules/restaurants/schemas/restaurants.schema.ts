import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {GeoPoint, GeoPointSchema} from "./geo-point.schema";
import {Types} from "mongoose";
import {LocalizedName, LocalizedNameSchema} from "./localized-name.schema";

@Schema({timestamps: true})
export class Restaurant {
    _id?: Types.ObjectId;

    @Prop({
        type: LocalizedNameSchema,
        required: true,
    })
    name: LocalizedName;

    @Prop({
        type: String,
        required: true,
        unique: true,
        minlength: [1, 'Slug must be at least 1 character long'],
        maxlength: [50, 'Slug must be at most 50 characters long'],
        trim: true,
        lowercase: true
    })
    slug: string;

    @Prop({
        type: [String],
        required: true,
        validate: {
            validator: (val: string[]) => val.length <= 3,
            message: 'Cuisine must be an array of up to 3 elements'
        },
    })
    cuisine: string[];

    @Prop({
        type: GeoPointSchema,
        required: true
    })
    location: GeoPoint;
}

export const RestaurantsSchema = SchemaFactory.createForClass(Restaurant);

RestaurantsSchema.index({location: '2dsphere'});