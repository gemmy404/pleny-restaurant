import {Module, ValidationPipe} from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";

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
        })
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
