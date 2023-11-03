import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from '../dto/create.user.dto';
import { User } from '../model/user.entity';
import { QueueService } from 'src/core/queue/queue.service';
import { ADD_USER, BULLMQ, USER_QUEUE } from 'src/core/constants';
import { plainToInstance } from 'class-transformer';
import { UserSchema } from '../schema/user.schema';

@Injectable()
export class UserService {

    constructor(
        private userRepository: UserRepository,
        @Inject(BULLMQ) private queueService: QueueService,
    ) {

    }

    async createUser(createUserDto: CreateUserDto) {
        try {
            const newUser: User = await this.userRepository.createUser(createUserDto);
            const user: User = await this.userRepository.findUserbyEmail(newUser.email)
            const userObj = plainToInstance(UserSchema, user.toJSON());
            await this.queueService.addJobToQueue(USER_QUEUE, ADD_USER, userObj);
            return newUser;
        } catch (err) {

            throw err;
        }
    }

    async findUserByEmail(email: string) {
        try {
            const user: User = await this.userRepository.findUserbyEmail(email);
            return user;
        } catch (err) {

            throw err;
        }
    }

    async exsistsByEmail(email: string): Promise<boolean> {
        try {
            const bool = await this.userRepository.isUserExsistsByEmail(email);
            return bool;
        } catch (err) {
            throw err;

        }
    }

    async findUserById(id: bigint): Promise<UserSchema> {
        try {
            const user: User = await this.userRepository.findUserById(id);
            const userObj: UserSchema = plainToInstance(UserSchema, user.toJSON());
            return userObj;
        } catch (err) {
            throw err;
        }
    }

}
