import { Body, Controller, HttpException, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../dto/create.user.dto';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import { LoginUserDto } from '../dto/login.user.dto';
import { Request } from 'express';
import { SearchService } from 'src/core/elasticsearch/elasticsearch.service';
import { Roles } from 'src/auth/role/roles.decorator';
import { UserRole } from 'src/enums/user.role.enum';
import { JWTGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';

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
                throw new HttpException("User Already Exsists",HttpStatus.BAD_REQUEST);
            }

            await this.authService.createUser(createUserDto);
            return "Created Successfully";
            
        } catch (err) {
            throw err;
        }

    }

    @Post('login')
    async loginUser(@Body() loginUserDto : LoginUserDto){

        try{
           const userData = await this.authService.login(loginUserDto.email,loginUserDto.password);
           return userData;
        }catch(err){
            throw err;
        }

    }
    @Roles(UserRole.ADMIN)
    @UseGuards(JWTGuard,RoleGuard)
    @Post('searchByName')
    async searchQuery(@Req() req: Request){
        try {
            const users = await this.searchService.searchUser(req.body.name);
            return users;
        } catch (error) {
            throw error;
        }
    }

}
