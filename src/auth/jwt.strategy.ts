
import { BadRequestException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { configDotenv } from "dotenv";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "src/user/core/user.service";
import { User } from "src/user/model/user.entity";
import * as dotenv from 'dotenv';
import { UserSchema } from "src/user/schema/user.schema";
dotenv.config()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.KEY,
        })
    }

    async validate(payload: any) {
        try {
            const user: UserSchema = await this.userService.findUserById(payload.sub);
            if (!user) {
                throw new BadRequestException("Not a valid User");
            }
            return payload;
        } catch (err) {
            throw err;
        }
    }

}