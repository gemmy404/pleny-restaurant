import {Module} from '@nestjs/common';
import {RecommendationsService} from './recommendations.service';
import {RecommendationsController} from './recommendations.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UsersSchema} from "../users/schemas/users.schema";
import {RecommendationsRepository} from "./recommendations.repository";
import {UsersModule} from "../users/users.module";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: User.name, schema: UsersSchema}
        ]),
        UsersModule,
    ],
    controllers: [RecommendationsController],
    providers: [RecommendationsRepository, RecommendationsService],
})
export class RecommendationsModule {
}
