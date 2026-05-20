import {Module, ValidationPipe} from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import {UsersModule} from './modules/users/users.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                uri: configService.getOrThrow('MONGODB_URI')
            }),
            inject: [ConfigService]
        }),
        UsersModule
    ],
    providers: [
        {
            provide: 'APP_PIPE',
            useValue: new ValidationPipe({
                whitelist: true,
                forbidNonWhitelisted: true,
                transform: true,
            }),
        }
    ]
})
export class AppModule {
}
