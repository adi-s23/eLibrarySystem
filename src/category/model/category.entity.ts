import { Model, Column, DataType, Table, HasMany } from "sequelize-typescript";
import { Book } from "src/book/model/book.entity";
import { BookService } from "src/book/core/book.service";

@Table({
    tableName: 'Category',
    timestamps: true,
    underscored: true,
    paranoid: true
})
export class Category extends Model{

    @Column({
        type: DataType.STRING
    })
    name: string;

    @HasMany(()=> Book, {
        foreignKey: {
            name: 'categoryId'
        }
    })
    book: Book[]
}