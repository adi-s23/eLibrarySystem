import { Inject, Injectable } from "@nestjs/common";
import { SEQUELIZE } from "src/core/constants";
import { Book } from "../model/book.entity";
import { DbModels } from "src/core/database.types";
import { CreateBookDto } from "../dto/create-book.dto";
import { HideStatus } from "src/enums/book.hidden.status.enum";
import { UpdateBookStatusDto } from "../dto/update-book-status.dto";


@Injectable()
export class BookRepository{

    constructor(@Inject(SEQUELIZE) private db: DbModels){

    }

    async findAllBooks(): Promise<Book[]> {
        try{
       const books: Book[] = await this.db.Book.findAll()
       return books;
        }catch(err){
            console.log(err)
        }
    }

    async createBook(userId:bigint,createBookDto: CreateBookDto){
        try{
            const newBook : Book = await new this.db.Book({
                createdBy: userId,
                bookName: createBookDto.name,
                categoryId: createBookDto.categoryId,
                price: createBookDto.price,
                hideStatus: HideStatus.NOT_HIDDEN
            })
        await newBook.save()
        return newBook;
        }catch(err){
            
        }
    }

    async updateBookStatus(userId: bigint, updateBookStatusDto: UpdateBookStatusDto){
        try{
            
            await this.db.Book.update({hideStatus: updateBookStatusDto.status},{where: {
                id: updateBookStatusDto.bookId,
                createdBy: userId,
            }})
            


        }catch(err){
            throw err;
        }
    }

    async findBookByBookId(bookId: bigint): Promise<Book>{
        try{
            return await this.db.Book.findByPk(bookId);
        }catch(err){
            throw err;
        }
    }

    async findBooksByCategory(categoryId: bigint){
        try {
            return await this.db.Book.findAll({where:{
                categoryId: categoryId
            }, 
        raw: true})
        } catch (error) {
            throw error;
        }
    }


}