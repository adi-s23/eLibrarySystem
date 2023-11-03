import { Injectable } from '@nestjs/common';
import { SubscribeRepository } from './subscribe.repository';
import { DataBaseQueryOptions } from 'src/core/database/database-query.options';
import { UpdateTxnStatusDto } from 'src/transaction/dto/update-transaction.dto';
import { SubscribeStatus } from 'src/enums/subscribe.status.enum';

@Injectable()
export class SubscribeService {

    constructor(private subscribeRepository:SubscribeRepository,){

    }

    async createSubscribe(txnId:bigint,updateTxnStatusDto:UpdateTxnStatusDto,options?: DataBaseQueryOptions){
        try{
            await this.subscribeRepository.createSubscription(txnId,updateTxnStatusDto,options);
        }catch(err){
            throw err
        }
    }

    async findAllSubscribeBooks(userId: bigint){
        try{
           const subsribedBooks = await this.subscribeRepository.findAllSubscribe(userId);
           return subsribedBooks;
        }catch(err){
            throw err;
        }
    }

    async findAllSubscribedUsers(bookId: bigint){
        try{
            const subscribedUsers =  await this.subscribeRepository.findAllUsersSubscribed(bookId);
            return subscribedUsers;
        }catch(err){
            throw err;
        }
    }

    async updateStatusSubscribe(status: SubscribeStatus,bookId:bigint, userId: bigint){
        try{
            await this.subscribeRepository.updateSubscribeStatus(status,userId,bookId);
        }catch(err){
            throw err;
        }
    }
}
