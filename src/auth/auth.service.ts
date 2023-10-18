import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/core/user.service";
import { CreateUserDto } from "src/user/dto/create.user.dto";
import { User } from "src/user/model/user.entity";
import * as bcrypt from 'bcrypt';

@Injectable()
export class  AuthService{

    constructor(
        private userService: UserService,
        private jwtService: JwtService
        ){

    }

    async login(email: string, password: string){
        const user: User = await this.userService.findUserByEmail(email);

        if(!user){
            throw new UnauthorizedException({error: "Invalid User"});
        }
        const result = await bcrypt.compare(password,user.password);
        if(!result){
            throw new UnauthorizedException({error: "Incorrect Password"});
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

    }

    async createUser(createUserDto: CreateUserDto){
        
        const hashedPassword = await bcrypt.hash(createUserDto.password,10);
        const newDto : CreateUserDto= {...createUserDto,password: hashedPassword}
        const newUser = await this.userService.createUser(newDto);

    }
} 