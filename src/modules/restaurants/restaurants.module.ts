import {Module} from '@nestjs/common';
import {RestaurantsService} from './restaurants.service';
import {RestaurantsController} from './restaurants.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Restaurant, RestaurantsSchema} from "./schemas/restaurants.schema";
import {RestaurantsRepository} from "./restaurants.repository";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Restaurant.name, schema: RestaurantsSchema}
        ]),
    ],
    controllers: [RestaurantsController],
    providers: [RestaurantsRepository, RestaurantsService],
    exports: [RestaurantsRepository],
})
export class RestaurantsModule {
}
