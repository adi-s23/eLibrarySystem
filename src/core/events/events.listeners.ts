import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { BookService } from "src/book/core/book.service";
import { BookSchema } from "src/book/schema/book.schema";
import { CartService } from "src/cart/core/cart.service";
import { Cart } from "src/cart/model/cart.entity";
import { TransactionStatus } from "src/enums/transaction.status.enum";
import { TransactionService } from "src/transaction/core/transaction.service";
import { TransactionCreateDto } from "src/transaction/dto/create-transaction.dto";

@Injectable()
export class Eventlisteners{
    constructor(private transactionService: TransactionService,
        private bookService: BookService,
        //private cartService: CartService
        ){

    }

    @OnEvent('checkOut')
    async handleCartCheckOut(cart: Cart[]){
        try{
            cart.forEach(async (cartItem) => {
                const createTransactionDto = new TransactionCreateDto();
                const book : BookSchema = await this.bookService.findBookById(cartItem.cartBookId);
                createTransactionDto.bookId = cartItem.cartBookId;
                createTransactionDto.userId = cartItem.cartUserId;
                createTransactionDto.txnStatus = TransactionStatus.PENDING;
                createTransactionDto.price = book.price;
                this.transactionService.createTxn(createTransactionDto);
            })
            
        }catch(err){
            throw err;
        }
    }
}