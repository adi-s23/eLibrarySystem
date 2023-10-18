import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript"
import { Cart } from "src/cart/model/cart.entity"
import { Category } from "src/category/model/category.entity"
import { HideStatus } from "src/enums/book.hidden.status.enum"
import { Subscribe } from "src/subscribe/model/subscribe.entity"
import { BookTransaction } from "src/transaction/model/transaction.entity"
import { User } from "src/user/model/user.entity"

@Table({
    tableName: 'Book',
    timestamps: true,
    underscored: true,
    paranoid: true,
})
export class Book extends Model{
    @Column({
        type: DataType.STRING,
        field: 'book_name'
    })
    bookName: string

    @Column({
        type: DataType.TEXT,
        field: 'description'
    })
    description: string
    
    @Column({
        type: DataType.FLOAT,
        field: 'price',
        validate: {
            min: 0
        }
    })
    price: number


    
    @Column({
        type: DataType.BIGINT,
        field: 'created_by'
    })
    createdBy: bigint

    @BelongsTo(()=> User,{
        as: 'user',
        foreignKey: {
            name: 'createdBy'
        }
    })
    user: User


    @Column({
        type: DataType.BIGINT,
        field: 'category_id',
    })
    categoryId: bigint;
    
    @BelongsTo(()=>Category,{
        as: 'category',
        foreignKey:{
            name: 'categoryId'
        }
    })
    category: Category
    

    @Column({
        type: DataType.ENUM(...Object.values(HideStatus)),
        field: 'hide_status'
    })
    hideStatus: HideStatus

    @HasMany(()=>Cart,{
        as:'cartBook',
        foreignKey: {
            name: 'cartBookId'
        }
    })
    cartBook: Cart[]


    @HasMany(() => BookTransaction,{
        as: 'transactions',
        foreignKey: {
            name: 'txnBookId'
        }
    })
    transactions: BookTransaction[]


    @HasMany(() => Subscribe,{
        as: 'subscribes',
        foreignKey: {
            name: 'subscribedBookId'
        }
    })
    subscribes: Subscribe[]

}