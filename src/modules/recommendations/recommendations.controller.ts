import {Controller, Get, Param} from '@nestjs/common';
import {RecommendationsService} from './recommendations.service';
import {Types} from "mongoose";
import {ParseObjectIdPipe} from "@nestjs/mongoose";
import {AppResponseDto} from "../../common/dto/app-response.dto";
import {RecommendationResponseDto} from "./dto/recommendation-response.dto";
import {ApiResponse, ApiTags} from "@nestjs/swagger";

@Controller('api/v1/recommendations')
@ApiTags('Recommendations')
export class RecommendationsController {

    constructor(private readonly recommendationsService: RecommendationsService) {
    }

    // Returns a list of users who have same favorite cuisines and list of restaurants they have followed
    // Excludes the user who is requesting recommendations
    @Get('user/:userId')
    @ApiResponse({type: RecommendationResponseDto})
    findRecommendationsByUserId(
        @Param('userId', ParseObjectIdPipe) userId: Types.ObjectId,
    ): Promise<AppResponseDto<RecommendationResponseDto>> {
        return this.recommendationsService.findRecommendationsByUserId(userId);
    }

}
