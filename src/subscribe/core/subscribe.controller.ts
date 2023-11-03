import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { Subscribable } from 'rxjs';
import { SubscribeService } from './subscribe.service';
import { Request } from 'express';
import { UserRole } from 'src/enums/user.role.enum';
import { Roles } from 'src/auth/role/roles.decorator';
import { JWTGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { UserInterceptor } from 'src/core/interceptors/user.interceptor';
import { BookService } from 'src/book/core/book.service';
import { Book } from 'src/book/model/book.entity';
import { UpdateSubscribeStatusDto } from '../dto/update-subscribe-status.dto';
import { BookSchema } from 'src/book/schema/book.schema';

@Controller('subscribe')
export class SubscribeController {
    constructor(private subscribeService: SubscribeService,private bookService: BookService){

    }

    @Roles(UserRole.USER)
    @UseGuards(JWTGuard,RoleGuard)
    @UseInterceptors(UserInterceptor)
    @Get()
    async allSubscribedBooks(@Req() req : Request){
        try {
            const allBooks = await this.subscribeService.findAllSubscribeBooks(req.body.userId);
            return allBooks;
        } catch (error) {
            throw error;
        }
    }

    @Roles(UserRole.ADMIN)
    @UseGuards(JWTGuard,RoleGuard)
    @UseInterceptors(UserInterceptor)
    @Post('users')
    async allSubscribedUsers(@Req() req : Request){
        try {
            const book: BookSchema =  await this.bookService.findBookById(req.body.bookId);
            if(!book || book.createdBy != req.body.userId){
                throw new HttpException("Not Allowed",HttpStatus.FORBIDDEN)
            }
            const subscribedUsers = await  this.subscribeService.findAllSubscribedUsers(req.body.bookId);
            return subscribedUsers;
        } catch (error) {
            throw error;
        }

    }

    @Roles(UserRole.USER)
    @UseGuards(JWTGuard, RoleGuard)
    @UseInterceptors(UserInterceptor)
    @Post()
    async updateStatus(@Req() req: Request,@Body() updateSubscribeStatusDto: UpdateSubscribeStatusDto){
        try {
            await this.subscribeService.updateStatusSubscribe(updateSubscribeStatusDto.status,updateSubscribeStatusDto.bookId
                ,req.body.userId);
        } catch (error) {
            throw error;
        }
    }

}
