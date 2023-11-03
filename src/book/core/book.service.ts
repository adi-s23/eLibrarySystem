import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { BookRepository } from './book.repository';
import { Book } from '../model/book.entity';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookStatusDto } from '../dto/update-book-status.dto';
import { ADD_BOOK, BOOK_QUEUE, BOOK_UPDATE_STATUS, BULLMQ, CATEGORY_KEY_REDIS, QUEUE_DELAY_FOR_UPDATE_BOOK, REDIS_CACHE, UPDATE_BOOK, UPDATE_BOOK_REDIS } from 'src/core/constants';
import { RedisService } from 'src/core/redis/redis.service';
import { CategoryService } from 'src/category/core/category.service';
import { QueueService } from 'src/core/queue/queue.service';
import { UpdateBookDto } from '../dto/update-book.dto';
import { BookSchema } from '../schema/book.schema';
import {  plainToInstance } from 'class-transformer';

@Injectable()
export class BookService {

    constructor(private bookRepository: BookRepository,
        @Inject(REDIS_CACHE) private cacheService: RedisService,
        @Inject(BULLMQ) private queueService: QueueService,
        private categoryService: CategoryService,
        @Inject(REDIS_CACHE) cacheManager: RedisService) {
    }

    async findAllBooks(): Promise<BookSchema[]> {
        try {

            const books: Book[] = await this.bookRepository.findAllBooks();
            const bookObj: BookSchema[] = plainToInstance(BookSchema,books);
            return bookObj;

        } catch (err) {

            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }
    async createBook(userId: bigint, createBookDto: CreateBookDto): Promise<BookSchema> {
        try {
            await this.isBookCategoryExsistsinCache(createBookDto.categoryId);
            const newBook: Book = await this.bookRepository.createBook(userId, createBookDto)
            const book: BookSchema = plainToInstance(BookSchema, newBook.toJSON());
            await this.queueService.addJobToQueue(BOOK_QUEUE, ADD_BOOK, book.id);
            return book;

        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }

    async updateBookStatus(userId: bigint, updateBookStatusDto: UpdateBookStatusDto): Promise<void> {
        try {
            const book: Book = await this.bookRepository.findBookByBookId(updateBookStatusDto.bookId);
            const bookObj: BookSchema = plainToInstance(BookSchema,book);
            await this.isBookCategoryExsistsinCache(book.categoryId)
            await this.bookRepository.updateBookStatus(userId, updateBookStatusDto);
        } catch (err) {
            throw err;
        }
    }

    async findBookById(bookId: bigint): Promise<BookSchema> {

        try {
            const book: Book = await this.bookRepository.findBookByBookId(bookId);
            const bookObj = plainToInstance(BookSchema, book);
            return bookObj;
        } catch (err) {
             throw new HttpException(err,HttpStatus.BAD_REQUEST);
        }
    }

    async findBookByCategory(categoryId: bigint): Promise<BookSchema[]> {
        try {
            const categoryKey : string= CATEGORY_KEY_REDIS + categoryId.toString();
            let books = await this.cacheService.get(categoryKey);
            if (books) {
                return JSON.parse(books);
            } else {
                let books = await this.bookRepository.findBooksByCategory(categoryId);
                let booksObj = plainToInstance(BookSchema,books);
                let bookString = JSON.stringify(booksObj)
                await this.cacheService.set(categoryKey, bookString);
                return booksObj;
            }
        } catch (error) {
            throw error;
        }
    }

    async isBookCategoryExsistsinCache(categoryId): Promise<boolean> {
        try {
            const categoryKey = CATEGORY_KEY_REDIS + categoryId.toString();
            const bool: boolean = await this.cacheService.hgetall(categoryKey) ? true : false;
            if (bool) {
                await this.cacheService.del(categoryKey);
            }
            return bool;
        } catch (error) {
            throw error;
        }
    }

    async updateBook(updateBookDto: UpdateBookDto): Promise<void> {
        try {
            await this.bookRepository.updateBook(updateBookDto);
            const updateBookKey : string = UPDATE_BOOK_REDIS + updateBookDto.bookId.toString();
            const isSentToQueue = await this.cacheService.get(updateBookKey);
            if(!isSentToQueue){
                await this.cacheService.set(updateBookKey,"true");
                await this.queueService.addJobToQueueWithDelay(BOOK_QUEUE,UPDATE_BOOK,updateBookDto.bookId,QUEUE_DELAY_FOR_UPDATE_BOOK)
            }
        } catch (error) {
            throw error;
        }
    }

}
