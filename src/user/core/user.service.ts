import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from '../dto/create.user.dto';

@Injectable()
export class UserService {

    constructor(private userRepository: UserRepository){

    }

    async createUser(createUserDto: CreateUserDto){
        try{
           return this.userRepository.createUser(createUserDto);
        }catch(err){

        }
    }

    async findUserByEmail(email: string){
        try{
        return await this.userRepository.findUserbyEmail(email);
        }catch(err){

        }
    }

    async exsistsByEmail(email: string): Promise<boolean> {
        try{
           return await this.userRepository.isUserExsistsByEmail(email);
        }catch(err){

        }
    }

    async findUserById(id: bigint){
        try{
            return this.userRepository.findUserById(id);
        }catch(err){

        }
    }
    
}
