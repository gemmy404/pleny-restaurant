import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

@Schema({_id: false})
export class GeoPoint {
    @Prop({
        type: String,
        enum: ['Point'],
        required: true
    })
    type: 'Point';

    // Coordinates equivalent to [longitude, latitude]
    @Prop({
        type: [Number],
        required: true,
        validate: {
            validator: (val: number[]) => val.length === 2,
            message: 'Coordinates must be an array of length 2'
        },
    })
    coordinates: [number, number];
}

export const GeoPointSchema = SchemaFactory.createForClass(GeoPoint);