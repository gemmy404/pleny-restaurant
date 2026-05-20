import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User} from "./schemas/users.schema";
import {Model, Types} from "mongoose";

@Injectable()
export class UsersRepository {

    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
    }

    async createUser(user: User) {
        return this.userModel.create(user);
    }

    async findAllUsers(size: number, skip: number) {
        const [users, totalElements] = await Promise.all([
            this.userModel.find()
                .sort({createdAt: -1})
                .limit(size)
                .skip(skip),
            this.userModel.countDocuments()
        ]);

        return {users, totalElements};
    }

    async findUserById(userId: Types.ObjectId) {
        return this.userModel.findById(userId);
    }

}
