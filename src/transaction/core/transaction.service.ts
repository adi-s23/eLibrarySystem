import { Injectable } from '@nestjs/common';
import { TransactionRepository } from './transaction.repository';
import { TransactionCreateDto } from '../dto/create-transaction.dto';
import { Sequelize, Transaction } from 'sequelize';
import { UpdateTxnStatusDto } from '../dto/update-transaction.dto';
import { SubscribeService } from 'src/subscribe/core/subscribe.service';
import { BookTransaction } from '../model/transaction.entity';

@Injectable()
export class TransactionService {
    constructor(
        private transationRepository: TransactionRepository,
        private subscibeService: SubscribeService,
        //private sequelize: Sequelize
        ){

    }

    async createTxn(createTransactionDto: TransactionCreateDto){
        this.transationRepository.createTransaction(createTransactionDto);
    }

    async UpdateTxnStatus(updateTxnStatusDto: UpdateTxnStatusDto){
            let t:Transaction;
        try{
            t=await this.transationRepository.createSequelizeTxn();
            await this.transationRepository.updateTransaction(updateTxnStatusDto,{transaction: t});
            const txn: BookTransaction = await this.transationRepository.findByBookAndUser(updateTxnStatusDto.bookId,updateTxnStatusDto.userId,{transaction: t});
            await this.subscibeService.createSubscribe(txn.id,updateTxnStatusDto,{transaction: t});
            await t.commit();
        }catch(err){
           await t.rollback();
        }
    }


}
