import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from '../dto/create.user.dto';
import { ElasticSearch } from 'src/core/elasticsearch/elasticsearch.module';
import { SearchService } from 'src/core/elasticsearch/elasticsearch.service';
import { User } from '../model/user.entity';

@Injectable()
export class UserService {

    constructor(private userRepository: UserRepository,private searchService: SearchService){

    }

    async createUser(createUserDto: CreateUserDto){
        try{
           const newUser: User = await this.userRepository.createUser(createUserDto);
           const user: User = await this.userRepository.findUserbyEmail(newUser.email)
           console.log(user)
           await this.searchService.createUser(createUserDto,user.id);
        return newUser;
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
