import { Inject, Injectable } from "@nestjs/common";
import { SEQUELIZE } from "src/core/constants";

import { DbModels } from "src/core/database.types";
import { User } from "../model/user.entity";
import { CreateUserDto } from "../dto/create.user.dto";
import { where } from "sequelize";

@Injectable()
export class UserRepository {

    constructor(@Inject(SEQUELIZE) private db: DbModels) {

    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {

        try {
            const user: User = await new this.db.User({
                name: createUserDto.name,
                email: createUserDto.email,
                password: createUserDto.password,
                role: createUserDto.role
            })
            await user.save();
            return user;
        } catch (error) {
            throw error;
        }

    }

    async findUserbyEmail(email: string): Promise<User> {
        try {
            const user = await this.db.User.findOne({ where: { email: email } });
            return user;
        } catch (error) {
            throw error;
        }
    }

    async isUserExsistsByEmail(email: string): Promise<boolean> {
        try {
            const bool = await this.db.User.count({ where: { email: email } }).then(count => (count > 0) ? true : false);
            return bool;
        } catch (error) {
            throw error;
        }
    }

    async findUserById(id: bigint): Promise<User> {
        try {
            const user: User = await this.db.User.findByPk(id);
            return user;
        } catch (error) {
            throw error;
        }
    }
}