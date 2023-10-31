import { Inject, Injectable } from "@nestjs/common";
import { error } from "console";
import { UpdateBookStatusDto } from "src/book/dto/update-book-status.dto";
import { Book } from "src/book/model/book.entity";
import { SEQUELIZE } from "src/core/constants";
import { DbModels } from "src/core/database.types";
import { DataBaseQueryOptions } from "src/core/database/database-query.options";
import { SubscribeStatus } from "src/enums/subscribe.status.enum";
import { UpdateTxnStatusDto } from "src/transaction/dto/update-transaction.dto";
import { User } from "src/user/model/user.entity";

@Injectable()
export class SubscribeRepository {
    constructor(@Inject(SEQUELIZE) private db: DbModels) {

    }

    async createSubscription(txnId: bigint, updateTxnStatusDto: UpdateTxnStatusDto, option?: DataBaseQueryOptions) {
        try {
            await this.db.Subscribe.create({
                subscribedUserId: updateTxnStatusDto.userId,
                subscribedBookId: updateTxnStatusDto.bookId,
                transactionId: txnId,
                subscribeStatus: SubscribeStatus.SUBCRIBED
            }, { ...option })
        } catch (err) {
            console.log(error);
            throw err
        }
    }

    async findAllSubscribe(userId: bigint){
        try{
            return await this.db.Subscribe.findAll({attributes: {exclude: ['createdAt','updatedAt']},
            include: {model: Book,attributes: {exclude: ['createdAt','updatedAt','deletedAt','hideStatus']},required: true},
            where:{
                subscribedUserId: userId,
                subscribeStatus: SubscribeStatus.SUBCRIBED
            }})
        }catch(err){
            throw err;
        }
    }
    
    async findAllUsersSubscribed(bookId: bigint){
        try{
            return await this.db.Subscribe.findAll({attributes: {exclude: ['createdAt','updatedAt']},
            include: {model: User, required: true, attributes: {exclude: ['createdAt','updatedAt','password']}},
            where: {
                subscribedBookId: bookId,
                subscribeStatus: SubscribeStatus.SUBCRIBED
            },})
        }catch(err){
            throw err;
        }
    }

    async updateSubscribeStatus(status: SubscribeStatus,userId: bigint, bookId: bigint){
        try{
            return await this.db.Subscribe.update({subscribeStatus: status},{where:{
                 subscribedBookId: bookId,
                 subscribedUserId: userId,
            }});
        }catch(err){
            throw err;
        }
    }
    


}