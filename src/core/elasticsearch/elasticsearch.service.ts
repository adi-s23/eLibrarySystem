import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { CreateBookDto } from "src/book/dto/create-book.dto";
import { Book } from "src/book/model/book.entity";
import { BookSchema } from "src/book/schema/book.schema";
import { SubscribeStatus } from "src/enums/subscribe.status.enum";
import { BookTransaction } from "src/transaction/model/transaction.entity";

import { UserSchema } from "src/user/schema/user.schema";
import { BOOK_INDEX, TRANSACTION_INDEX, USER_INDEX } from "../constants";

@Injectable()
export class SearchService {
    constructor(private readonly elasticSearchService: ElasticsearchService) {

    }

    async searchUser(q: string) {
        try {
            const result = await this.elasticSearchService.search({
                index: USER_INDEX,
                body: {
                    query: {
                        match: {
                            name: q
                        }
                    }
                }
            })
            const users = result.hits.hits;
            return users;
        } catch (err) {
            throw err;
        }
    }

    async createUser(user: UserSchema) {
        try {
            const result = await this.elasticSearchService.index({
                index: USER_INDEX,
                id: user.id.toString(),
                document: {
                    name: user.name,
                    email: user.email,
                    role: user.role.toString(),
                    joined_at: user.createdAt
                }
            })
            console.log("hi" + result);
        } catch (err) {
            throw err;
        }
    }

    async createBook(createBookDto: BookSchema, categoryName: string) {
        try {
            const result = await this.elasticSearchService.index({
                index: BOOK_INDEX,
                id: createBookDto.id.toString(),
                document: {
                    name: createBookDto.bookName,
                    price: createBookDto.price,
                    category: categoryName,
                    description: createBookDto.description,
                    created_at: new Date()
                }
            })
        } catch (err) {

        }
    }

    async createTransaction(bookTxn: BookTransaction, book: BookSchema, category: string) {
        try {
            const result = await this.elasticSearchService.index({
                index: TRANSACTION_INDEX,
                id: bookTxn.id,
                document: {
                    transaction_id: bookTxn.id,
                    transaction_by: bookTxn.txnUserId,
                    txn_status: bookTxn.txnStatus,
                    transaction_at: bookTxn.createdAt,
                    books: [
                        {
                            book_id: bookTxn.txnBookId,
                            price: book.price,
                            category: category,
                            subscribe_status: null,
                            revoked_at: null
                        }
                    ]
                }
            })
        } catch (err) {
            throw err;
        }
    }

    async updateTransaction(bookTxn: BookTransaction) {
        try {
            const bookDoc = await this.elasticSearchService.get({
                index: TRANSACTION_INDEX,
                id: bookTxn.id
            })
            const txnBody = bookDoc?._source
            txnBody['books'].forEach((book) => {
                if (book.book_id == bookTxn.txnBookId){                    
                        book['subscribe_status'] = SubscribeStatus.SUBCRIBED.toString();                    
                }
            });
            txnBody['transaction_at'] = bookTxn.updatedAt;
            txnBody['txn_status'] = bookTxn.txnStatus.toString();

            await this.elasticSearchService.index({
                index: 'transaction_index',
                id: bookTxn.id,
                document: txnBody
            })
            console.log("updated");

        } catch (err) {
            throw err;
        }
    }

    async updateBookinES(bookObj : BookSchema){
        try {
            console.log("fi")
            const result = await this.elasticSearchService.update({
                index: BOOK_INDEX,
                id: bookObj.id.toString(),
                doc:{
                    name: bookObj.bookName,
                    description: bookObj.description,
                    price: bookObj.price,
                }
            }) 
            console.log(result);
        } catch (error) {
            throw error;
        }
    }


}