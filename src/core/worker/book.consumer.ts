
import { SearchService } from "../elasticsearch/elasticsearch.service";
import { ADD_BOOK, BOOK_QUEUE, REDIS_CACHE, UPDATE_BOOK, UPDATE_BOOK_REDIS } from "../constants";
import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { Worker } from "bullmq";
import { CategoryService } from "src/category/core/category.service";
import { RedisService } from "../redis/redis.service";
import { BookService } from "src/book/core/book.service";
import { BookSchema } from "src/book/schema/book.schema";

@Injectable()
export class BookConsumer{
    
    private bookWorker;

    constructor(private searchService: SearchService,
         private categoryService: CategoryService,
         @Inject(REDIS_CACHE) private cacheService: RedisService,
         private bookService: BookService
        ){
        this.createBookWorker();
    }
    

    createBookWorker(){
        try {
            this.bookWorker = new Worker(BOOK_QUEUE, this.bookJob);
        } catch (error) {
            throw error;
        }
    }

    bookJob = async (job) => {
        try {
            switch(job.name){
                case(ADD_BOOK):
                    console.log(job.data)
                    console.log("Processing by Book Consumer")
                    const book: BookSchema = await this.bookService.findBookById(job.data);
                    const categoryName: string = await this.categoryService.findCategoryNameById(book.categoryId)
                    await this.searchService.createBook(book,categoryName);
                    break;
                case(UPDATE_BOOK):
                    await this.processUpdateBook(job);
                    break;
            }
        } catch (error) {
            throw error;
        }
    }

    async processUpdateBook(job: any){
        try {
            const bookObj : BookSchema = await this.bookService.findBookById(job.data);
            await this.searchService.updateBookinES(bookObj);
            const updateBookKey = UPDATE_BOOK_REDIS+ bookObj.id.toString()
            await this.cacheService.del(updateBookKey);
        } catch (error) {
            throw error;
        }
    }
    
}