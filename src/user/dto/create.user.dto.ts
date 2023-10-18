import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { UserRole } from "src/enums/user.role.enum";

export class CreateUserDto{

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsEnum(UserRole)
    role: UserRole
    
    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    password: string;

}