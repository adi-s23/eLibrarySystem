import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/create.user.dto';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import { LoginUserDto } from '../dto/login.user.dto';

@Controller('user')
export class UserController {

    constructor(private userService: UserService, private authService: AuthService) {

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

        }

    }

}
