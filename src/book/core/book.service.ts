import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BookRepository } from './book.repository';
import { Book } from '../model/book.entity';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookStatusDto } from '../dto/update-book-status.dto';

@Injectable()
export class BookService {

    constructor(private bookRepository: BookRepository){

    }

    async findAllBooks(): Promise<Book[]> {
        try{

        return await this.bookRepository.findAllBooks();

        }catch(err){

            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }
    async createBook(userId: bigint, createBookDto: CreateBookDto): Promise<void> {
        try{
            this.bookRepository.createBook(userId,createBookDto)

        }catch(err){
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }

    async updateBookStatus(userId: bigint, updateBookStatusDto: UpdateBookStatusDto){
        try{
            this.bookRepository.updateBookStatus(userId,updateBookStatusDto);
        }catch(err){

        }
    }

    async findBookById(bookId: bigint){
        
        try{
            return this.bookRepository.findBookByBookId(bookId);
        }catch(err){

        }
    }

}
