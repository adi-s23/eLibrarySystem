import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { CreateBookDto } from "src/book/dto/create-book.dto";
import { Book } from "src/book/model/book.entity";
import { SubscribeStatus } from "src/enums/subscribe.status.enum";
import { BookTransaction } from "src/transaction/model/transaction.entity";
import { CreateUserDto } from "src/user/dto/create.user.dto";

@Injectable()
export class SearchService {
    constructor(private readonly elasticSearchService: ElasticsearchService) {

    }

    async searchUser(q: string) {
        try {
            const result = await this.elasticSearchService.search({
                index: 'user_index',
                body: {
                    query: {
                        match: {
                            name: q
                        }
                    }
                }
            })
            console.log(result);
            return result;
        } catch (err) {

        }
    }

    async createUser(createUserDto: CreateUserDto, userId: bigint) {
        try {
            const result = await this.elasticSearchService.index({
                index: 'user_index',
                id: userId.toString(),
                document: {
                    name: createUserDto.name,
                    email: createUserDto.email,
                    role: createUserDto.role.toString(),
                    joined_at: new Date()
                }
            })
            console.log("hi" + result);
        } catch (err) {

        }
    }

    async createBook(createBookDto: Book, categoryName: string) {
        try {
            const result = await this.elasticSearchService.index({
                index: 'book_index',
                id: createBookDto.id,
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

    async createTransaction(bookTxn: BookTransaction, book: Book, category: string) {
        try {
            const result = await this.elasticSearchService.index({
                index: 'transaction_index',
                id: bookTxn.id,
                document: {
                    transaction_id: bookTxn.id,
                    transaction_by: bookTxn.txnUserId,
                    txn_status: bookTxn.txnStatus,
                    transaction_at: new Date("2023-11-03"),
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
                index: 'transaction_index',
                id: bookTxn.id
            })
            const txnBody = bookDoc?._source
            txnBody['books'].forEach((book) => {
                if (book.book_id == bookTxn.txnBookId){                    
                        book['subscribe_status'] = SubscribeStatus.SUBCRIBED.toString();                    
                }
            });
            txnBody['transaction_at'] = new Date("2023-11-04");
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


}