import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { BookRepository } from './book.repository';
import { Book } from '../model/book.entity';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookStatusDto } from '../dto/update-book-status.dto';
import { REDIS_CACHE } from 'src/core/constants';
import { privateDecrypt } from 'crypto';
import { RedisService } from 'src/core/redis/redis.service';
import { SearchService } from 'src/core/elasticsearch/elasticsearch.service';
import { CategoryService } from 'src/category/core/category.service';

@Injectable()
export class BookService {

    constructor(private bookRepository: BookRepository,
        @Inject(REDIS_CACHE) private cacheService: RedisService,
        private searchService: SearchService,
        private categoryService: CategoryService){

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
            await this.isBookCategoryExsistsinCache(createBookDto.categoryId);
            const newBook : Book =await this.bookRepository.createBook(userId,createBookDto)
            const categoryName: string = await this.categoryService.findCategoryNameById(createBookDto.categoryId)
            await this.searchService.createBook(newBook,categoryName)
            

        }catch(err){
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }

    async updateBookStatus(userId: bigint, updateBookStatusDto: UpdateBookStatusDto){
        try{
            const book: Book = await this.bookRepository.findBookByBookId(updateBookStatusDto.bookId);
            await this.isBookCategoryExsistsinCache(book.categoryId)
            await this.bookRepository.updateBookStatus(userId,updateBookStatusDto);
        }catch(err){
            throw err;
        }
    }

    async findBookById(bookId: bigint): Promise<Book>{
        
        try{
            return await this.bookRepository.findBookByBookId(bookId);
        }catch(err){
            throw err;
        }
    }

    async findBookByCategory(categoryId: bigint){
        try {
            const categoryKey = "category" + categoryId.toString();
            let books = await this.cacheService.get(categoryKey);
            console.log("cache");
            if(books){
                return JSON.parse(books);
            }else{
                books = await this.bookRepository.findBooksByCategory(categoryId);
                books = JSON.stringify(books)
                await this.cacheService.set(categoryKey,books);
                return books;
            }
        } catch (error) {
            throw error;
        }
    }

    async isBookCategoryExsistsinCache(categoryId): Promise<boolean>{
        const categoryKey = "category" + categoryId.toString();
        const bool: boolean = await this.cacheService.hgetall(categoryKey)? true: false
        if(bool){
            await this.cacheService.del(categoryKey);
        }
        return bool;
    }

}
