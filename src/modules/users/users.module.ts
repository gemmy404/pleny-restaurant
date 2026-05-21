import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {UsersController} from './users.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UsersSchema} from "./schemas/users.schema";
import {UsersRepository} from "./users.repository";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: User.name, schema: UsersSchema},
        ])
    ],
    controllers: [UsersController],
    providers: [UsersRepository, UsersService],
    exports: [UsersRepository],
})
export class UsersModule {
}
