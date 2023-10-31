import { Body, Controller, Post, Req } from '@nestjs/common';
import { CreateUserDto } from '../dto/create.user.dto';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import { LoginUserDto } from '../dto/login.user.dto';
import { Request } from 'express';
import { SearchService } from 'src/core/elasticsearch/elasticsearch.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService, private authService: AuthService,private searchService: SearchService) {

    }

    @Post('signup')
    async createUser(@Body() createUserDto: CreateUserDto):Promise<string> {
        try {
            const alreadyExsists = await this.userService.exsistsByEmail(createUserDto.email);
            console.log(alreadyExsists);
            if (alreadyExsists) {
                return "User Already Exsists";
            }

            this.authService.createUser(createUserDto);
            return "Created Successfully";
            
        } catch (err) {

        }

    }

    @Post('login')
    async loginUser(@Body() loginUserDto : LoginUserDto){

        try{
            return this.authService.login(loginUserDto.email,loginUserDto.password);
        }catch(err){
            throw err;
        }

    }

    @Post('search')
    async searchQuery(@Req() req: Request){
        return await this.searchService.searchUser(req.body.name)
    }

}
