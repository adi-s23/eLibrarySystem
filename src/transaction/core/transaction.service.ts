import { Injectable } from '@nestjs/common';
import { TransactionRepository } from './transaction.repository';
import { TransactionCreateDto } from '../dto/create-transaction.dto';
import { Sequelize, Transaction } from 'sequelize';
import { UpdateTxnStatusDto } from '../dto/update-transaction.dto';
import { SubscribeService } from 'src/subscribe/core/subscribe.service';
import { BookTransaction } from '../model/transaction.entity';
import { SearchService } from 'src/core/elasticsearch/elasticsearch.service';
import { BookService } from 'src/book/core/book.service';
import { Book } from 'src/book/model/book.entity';
import { CategoryService } from 'src/category/core/category.service';

@Injectable()
export class TransactionService {
    constructor(
        private transationRepository: TransactionRepository,
        private subscibeService: SubscribeService,
        private bookService: BookService,
        private searchService: SearchService,
        private categoryService: CategoryService
        ){

    }

    async createTxn(createTransactionDto: TransactionCreateDto){
        const bookTxn: BookTransaction = await this.transationRepository.createTransaction(createTransactionDto);
        const book: Book = await this.bookService.findBookById(bookTxn.txnBookId)
        const category : string= await this.categoryService.findCategoryNameById(book.categoryId)
        await this.searchService.createTransaction(bookTxn,book,category)
    }

    async UpdateTxnStatus(updateTxnStatusDto: UpdateTxnStatusDto){
            let t:Transaction;
        try{
            t=await this.transationRepository.createSequelizeTxn();
            await this.transationRepository.updateTransaction(updateTxnStatusDto,{transaction: t});
            const txn: BookTransaction = await this.transationRepository.findByBookAndUser(updateTxnStatusDto.bookId,updateTxnStatusDto.userId,{transaction: t});
            await this.subscibeService.createSubscribe(txn.id,updateTxnStatusDto,{transaction: t});
            await t.commit();
            await this.searchService.updateTransaction(txn);
        }catch(err){
           await t.rollback();
        }
    }


}
