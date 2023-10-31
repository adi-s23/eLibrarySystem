import { Body, Controller, Get, HttpException, HttpStatus, Patch, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from '../model/book.entity';
import { CreateBookDto } from '../dto/create-book.dto';
import { JwtModule } from '@nestjs/jwt';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Roles } from 'src/auth/role/roles.decorator';
import { UserRole } from 'src/enums/user.role.enum';
import { UserInterceptor } from 'src/core/interceptors/user.interceptor';
import { Request } from 'express';
import { JWTGuard } from 'src/auth/jwt.guard';
import { UpdateBookStatusDto } from '../dto/update-book-status.dto';

@Controller('book')
export class BookController {

    constructor(private bookService: BookService){

    }

    @UseGuards(JWTGuard)
    @Get()
    async getAllBooks():Promise<Book[]>{
        const allBooks = await this.bookService.findAllBooks();
        return allBooks;
    }

    @Roles(UserRole.ADMIN)
    @UseGuards(JWTGuard,RoleGuard)
    @UseInterceptors(UserInterceptor)
    @Post()
    async createBook(@Req() req: Request,@Body() createbookDto: CreateBookDto): Promise<string> {
        try{
            this.bookService.createBook(req.body.userId,createbookDto);
            return "created Book"
        }catch(err){
            throw new HttpException(err,HttpStatus.BAD_REQUEST);
        }
    }

    @Roles(UserRole.ADMIN)
    @UseGuards(JWTGuard,RoleGuard)
    @UseInterceptors(UserInterceptor)
    @Patch()
    async UpdateBookStatus(@Req() req: Request,@Body() updateBookStatusDto: UpdateBookStatusDto): Promise<string>{

        try{
            if((await this.bookService.findBookById(updateBookStatusDto.bookId)).createdBy != req.body.userId){
                throw new HttpException("Not Allowed",HttpStatus.FORBIDDEN)
            }
            await this.bookService.updateBookStatus(req.body.userId,updateBookStatusDto);
            return "Updated";
        }catch(err){
            throw new HttpException(err,HttpStatus.BAD_REQUEST)
        }

    }
    
    @UseGuards(JWTGuard,RoleGuard)
    @UseInterceptors(UserInterceptor)
    @Post('category')
    async getBooksByCategory(@Req() req:Request){
        try {
            return this.bookService.findBookByCategory(req.body.categoryId);
        } catch (error) {
            throw error;   
        }
    }
}
