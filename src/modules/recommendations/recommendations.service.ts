import {Injectable, NotFoundException} from '@nestjs/common';
import {RecommendationsRepository} from "./recommendations.repository";
import {Types} from "mongoose";
import {AppResponseDto} from "../../common/dto/app-response.dto";
import {RecommendationResponseDto} from "./dto/recommendation-response.dto";
import {HttpStatusText} from "../../common/enums/http-status-text.enum";
import {UsersRepository} from "../users/users.repository";

@Injectable()
export class RecommendationsService {

    constructor(
        private readonly recommendationsRepository: RecommendationsRepository,
        private readonly usersRepository: UsersRepository,
        ) {

    }

    async findRecommendationsByUserId(userId: Types.ObjectId): Promise<AppResponseDto<RecommendationResponseDto>> {
        const existingUser = await this.usersRepository
            .findUserById(userId);
        if (!existingUser) {
            throw new NotFoundException('User not found');
        }

        const recommendations: RecommendationResponseDto[] = await this.recommendationsRepository
            .findRestaurantRecommendation(userId);

        const appResponse: AppResponseDto<RecommendationResponseDto> = {
            status: HttpStatusText.SUCCESS,
            data: recommendations[0],
        };

        return appResponse;
    }

}
