import { Inject, Injectable } from "@nestjs/common";
import { SEQUELIZE } from "src/core/constants";
import { DbModels } from "src/core/database.types";
import { TransactionCreateDto } from "../dto/create-transaction.dto";
import { DataBaseQueryOptions } from "src/core/database/database-query.options";
import { UpdateBookStatusDto } from "src/book/dto/update-book-status.dto";
import { UpdateTxnStatusDto } from "../dto/update-transaction.dto";
import { BookTransaction } from "../model/transaction.entity";
import { Sequelize, Transaction } from "sequelize";
import { TransactionStatus } from "src/enums/transaction.status.enum";

@Injectable()
export class TransactionRepository {

    constructor(@Inject(SEQUELIZE) private db: DbModels,
        @Inject("SQLIZE") private sequelize: Sequelize) {

    }

    async createTransaction(createTransactionDto: TransactionCreateDto):Promise<BookTransaction> {
        try {
            const bookTxn: BookTransaction = await this.db.BookTransaction.create({
                txnUserId: createTransactionDto.userId,
                txnBookId: createTransactionDto.bookId,
                txnPrice: createTransactionDto.price,
                txnStatus: createTransactionDto.txnStatus
            })
            return bookTxn;
        } catch (err) {

        }
    }

    async updateTransaction(updateTxnStatusDto: UpdateTxnStatusDto, option?: DataBaseQueryOptions) {
        try {
            await this.db.BookTransaction.update({ txnStatus: TransactionStatus.SUCCESFULL }, {
                where: {
                    txnUserId: updateTxnStatusDto.userId,
                    txnBookId: updateTxnStatusDto.bookId
                }, ...option
            })
        } catch (err) {
            throw err;
        }
    }

    async findByBookAndUser(bookId: bigint, userId: bigint, option?: DataBaseQueryOptions): Promise<BookTransaction> {
        try {
            return await this.db.BookTransaction.findOne({
                where: {
                    txnUserId: userId,
                    txnBookId: bookId
                }, ...option
            })
        } catch (err) {
            
        }
    }

    async createSequelizeTxn() {
        const transaction: Transaction = await this.sequelize.transaction();
        return transaction;
    }
}