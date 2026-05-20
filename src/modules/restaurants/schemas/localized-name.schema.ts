import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

@Schema({_id: false})
export class LocalizedName {
    @Prop({
        type: String,
        required: true,
        minlength: [1, 'Arabic Name must be at least 1 character long'],
        maxlength: [50, 'Arabic Name must be at most 50 characters long'],
        trim: true,
    })
    ar: string;

    @Prop({
        type: String,
        required: true,
        minlength: [1, 'English Name must be at least 1 character long'],
        maxlength: [50, 'English Name must be at most 50 characters long'],
        trim: true,
    })
    en: string;
}

export const LocalizedNameSchema = SchemaFactory.createForClass(LocalizedName);