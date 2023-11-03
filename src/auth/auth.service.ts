import { HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/core/user.service";
import { CreateUserDto } from "src/user/dto/create.user.dto";
import { User } from "src/user/model/user.entity";
import * as bcrypt from 'bcrypt';
import { RedisService } from "src/core/redis/redis.service";
import { REDIS_CACHE } from "src/core/constants";

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
       @Inject(REDIS_CACHE) private cacheService: RedisService
    ) {

    }

    async login(email: string, password: string) {
        try {
        
        const user: User = await this.userService.findUserByEmail(email);

        if (!user) {
            throw new UnauthorizedException({ error: "Invalid User" });
        }
        const result = await bcrypt.compare(password, user.password);
        let attempt;
        if (!result) {
            attempt = await this.cacheService.get(email);
            if (attempt == null) {
                await this.cacheService.set(email, 1)
            } else {
                let attempt = await this.cacheService.get(email);
                await this.cacheService.expire(email, 120);
                if (Number(attempt) == 3) {
                    throw new HttpException({ error: "Please try after 2 minutes account is blocked" }, HttpStatus.BAD_REQUEST);
                }
                await this.cacheService.incr(email);
            }
            throw new UnauthorizedException({ error: "Incorrect Password" });
        }
        if (Number( await this.cacheService.get(email)) == 3) {
            throw new HttpException({ error: "Please try after 2 minutes account is blocked" }, HttpStatus.BAD_REQUEST);
        }
        const payload = {
            sub: user.id,
            username: user.email,
            role: user.role
        }
        const accessToken = await this.jwtService.signAsync(payload)

        return {
            token: accessToken,
            user: {
                id: payload.sub,
                email: payload.username,
                role: payload.role
            }
        }

        } catch (error) {
            throw error;
        }
    }

    async createUser(createUserDto: CreateUserDto): Promise<void> {
        try{
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const newDto: CreateUserDto = { ...createUserDto, password: hashedPassword }
        const newUser = await this.userService.createUser(newDto);
        }catch(err){
            throw err;
        }

    }
} 