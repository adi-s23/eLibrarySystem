import { BadRequestException, Body, Controller, Get, HttpException, HttpStatus, Patch, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from '../model/book.entity';
import { CreateBookDto } from '../dto/create-book.dto';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Roles } from 'src/auth/role/roles.decorator';
import { UserRole } from 'src/enums/user.role.enum';
import { UserInterceptor } from 'src/core/interceptors/user.interceptor';
import { Request } from 'express';
import { JWTGuard } from 'src/auth/jwt.guard';
import { UpdateBookStatusDto } from '../dto/update-book-status.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { BookSchema } from '../schema/book.schema';

@Controller('book')
export class BookController {
    constructor(private bookService: BookService){

    }

    @UseGuards(JWTGuard)
    @Get()
    async getAllBooks():Promise<BookSchema[]>{
        try {
            const allBooks = await this.bookService.findAllBooks();
            return allBooks;
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    @Roles(UserRole.ADMIN)
    @UseGuards(JWTGuard,RoleGuard)
    @UseInterceptors(UserInterceptor)
    @Post()
    async createBook(@Req() req: Request,@Body() createbookDto: CreateBookDto): Promise<BookSchema> {
        try{
            let res = await this.bookService.createBook(req.body.userId,createbookDto);
            return res;
        }catch(err){
            throw new HttpException(err,HttpStatus.BAD_REQUEST);
        }
    }

    @Roles(UserRole.ADMIN)
    @UseGuards(JWTGuard,RoleGuard)
    @UseInterceptors(UserInterceptor)
    @Patch('status')
    async UpdateBookStatus(@Req() req: Request,@Body() updateBookStatusDto: UpdateBookStatusDto): Promise<void>{

        try{
            const book: BookSchema = await this.bookService.findBookById(updateBookStatusDto.bookId);
            if(book.createdBy != req.body.userId){
                throw new HttpException("Not Allowed",HttpStatus.FORBIDDEN)
            }
            await this.bookService.updateBookStatus(req.body.userId,updateBookStatusDto);
            
        }catch(err){
            throw new HttpException(err,HttpStatus.BAD_REQUEST)
        }

    }
    
    @UseGuards(JWTGuard,RoleGuard)
    @UseInterceptors(UserInterceptor)
    @Post('category')
    async getBooksByCategory(@Req() req:Request){
        try {
            const books = await this.bookService.findBookByCategory(req.body.categoryId);
            return books;
        } catch (error) {
            throw new BadRequestException({message: "Error in finding books"});   
        }
    }

    @Roles(UserRole.ADMIN)
    @UseGuards(JWTGuard,RoleGuard)
    @UseInterceptors(UserInterceptor)
    @Patch()
    async updateBook(@Body() updateBookDto : UpdateBookDto): Promise<void>{
        try {
            await this.bookService.updateBook(updateBookDto);
        } catch (error) {
            throw new BadRequestException({message: "Error in updating book"});
        }
    }
}
