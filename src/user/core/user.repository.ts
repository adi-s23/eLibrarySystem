import { Inject, Injectable } from "@nestjs/common";
import { SEQUELIZE } from "src/core/constants";

import { DbModels } from "src/core/database.types";
import { User } from "../model/user.entity";
import { CreateUserDto } from "../dto/create.user.dto";
import { where } from "sequelize";

@Injectable()
export class UserRepository {

    constructor(@Inject(SEQUELIZE) private db: DbModels){

    }

    async createUser(createUserDto: CreateUserDto){
        
        const user: User = await new this.db.User({
            name: createUserDto.name,
            email: createUserDto.email,
            password: createUserDto.password,
            role: createUserDto.role
        })
        user.save();

    }

    async findUserbyEmail(email: string): Promise<User> {
        return await this.db.User.findOne({where: {email: email}});
    }

    async isUserExsistsByEmail(email: string): Promise<boolean>{
        return await this.db.User.count({where: { email: email}}).then(count => (count>0) ? true: false);
    }

    async findUserById(id: bigint): Promise<User>{
        return await this.db.User.findByPk(id);
    }
}