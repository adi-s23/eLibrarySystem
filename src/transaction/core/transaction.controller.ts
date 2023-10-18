import { Body, Controller, HttpException, HttpStatus, Patch, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { UserRole } from 'src/enums/user.role.enum';
import { Roles } from 'src/auth/role/roles.decorator';
import { JWTGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { UserInterceptor } from 'src/core/interceptors/user.interceptor';
import { InitiateTxnReqDto } from '../dto/initiate-txn-req.dto';
import { BookService } from 'src/book/core/book.service';
import { Book } from 'src/book/model/book.entity';
import { TransactionCreateDto } from '../dto/create-transaction.dto';
import { Request } from 'express';
import { TransactionStatus } from 'src/enums/transaction.status.enum';
import { UpdateTxnStatusDto } from '../dto/update-transaction.dto';

@Controller('transaction')
export class TransactionController {

    constructor(private transactionService: TransactionService, private bookService: BookService) {

    }

    @Roles(UserRole.USER)
    @UseGuards(JWTGuard, RoleGuard)
    @UseInterceptors(UserInterceptor)
    @Post()
    async initializeTransaction(@Req() req: Request, @Body() initiateTxnReqDto: InitiateTxnReqDto): Promise<void> {
        try {
            const book: Book = await this.bookService.findBookById(initiateTxnReqDto.bookId);
            if (!book) {
                throw new HttpException("invalid book",HttpStatus.BAD_REQUEST)
            }
            const txn: TransactionCreateDto = new TransactionCreateDto();
            txn.bookId = book.id;
            txn.price = book.price;
            txn.userId = req.body.userId;
            txn.txnStatus = TransactionStatus.PENDING
            this.transactionService.createTxn(txn);

        } catch (err) {

        }


    }

    @Roles(UserRole.USER)
    @UseGuards(JWTGuard,RoleGuard)
    @UseInterceptors(UserInterceptor)
    @Patch()
    async successTransaction(@Req() req:Request,@Body() updateTxnStatusDto:UpdateTxnStatusDto){
            updateTxnStatusDto.userId = req.body.userId;
            await this.transactionService.UpdateTxnStatus(updateTxnStatusDto);
    }

}
