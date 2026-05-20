import {UserResponseDto} from "./dto/user-response.dto";
import {User} from "./schemas/users.schema";

export class UsersMapper {

    static toUserResponseDto(user: User): UserResponseDto {
        return {
            _id: user._id!.toString(),
            fullName: user.fullName,
            favoriteCuisine: user.favoriteCuisine,
        }
    }
}