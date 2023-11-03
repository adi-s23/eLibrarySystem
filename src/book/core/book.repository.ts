import { Inject, Injectable } from "@nestjs/common";
import { SEQUELIZE } from "src/core/constants";
import { Book } from "../model/book.entity";
import { DbModels } from "src/core/database.types";
import { CreateBookDto } from "../dto/create-book.dto";
import { HideStatus } from "src/enums/book.hidden.status.enum";
import { UpdateBookStatusDto } from "../dto/update-book-status.dto";
import { UpdateBookDto } from "../dto/update-book.dto";



@Injectable()
export class BookRepository {

    constructor(@Inject(SEQUELIZE) private db: DbModels) {

    }

    async findAllBooks(): Promise<Book[]> {
        try {
            const books: Book[] = await this.db.Book.findAll({ raw: true })
            return books;
        } catch (err) {
            console.log(err)
        }
    }

    async createBook(userId: bigint, createBookDto: CreateBookDto):Promise<Book> {
        try {
            const newBook: Book = await this.db.Book.create({
                createdBy: userId,
                bookName: createBookDto.name,
                categoryId: createBookDto.categoryId,
                price: createBookDto.price,
                hideStatus: HideStatus.NOT_HIDDEN,
                description: createBookDto.description
            },{raw: true})
            return newBook;
        } catch (err) {
            throw err;
        }
    }

    async updateBookStatus(userId: bigint, updateBookStatusDto: UpdateBookStatusDto): Promise<void> {
        try {

           const updatedBook = await this.db.Book.update({ hideStatus: updateBookStatusDto.status }, {
                where: {
                    id: updateBookStatusDto.bookId,
                    createdBy: userId,
                }
            });

        } catch (err) {
            throw err;
        }
    }

    async findBookByBookId(bookId: bigint): Promise<Book> {
        try {
            const book = await this.db.Book.findByPk(bookId, { raw: true });
            return book;
        } catch (err) {
            throw err;
        }
    }

    async findBooksByCategory(categoryId: bigint): Promise<Book[]> {
        try {
            const categoryBooks = await this.db.Book.findAll({
                where: {
                    categoryId: categoryId
                }, raw: true
            })
            return categoryBooks;
        } catch (error) {
            throw error;
        }
    }

    async updateBook(updateBookDto: UpdateBookDto): Promise<void> {
        try {
            await this.db.Book.update({
                bookName: updateBookDto.name,
                price: updateBookDto.price,
                description: updateBookDto.description
            },
            {
                where: {
                    id: updateBookDto.bookId
                }
            });

        } catch (error) {
            throw error;
        }
    }


}