import {Module} from '@nestjs/common';
import {RestaurantFollowsService} from './restaurant-follows.service';
import {RestaurantFollowsController} from './restaurant-follows.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {UserRestaurantFollow, UserRestaurantFollowSchema} from "./schemas/restaurant-follow.schema";
import {RestaurantFollowsRepository} from "./restaurant-follows.repository";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: UserRestaurantFollow.name, schema: UserRestaurantFollowSchema}
        ]),
    ],
    controllers: [RestaurantFollowsController],
    providers: [RestaurantFollowsRepository, RestaurantFollowsService],
})
export class RestaurantFollowsModule {
}
