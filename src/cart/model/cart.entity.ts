import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Book } from "src/book/model/book.entity";
import { User } from "src/user/model/user.entity";

@Table({
    tableName: 'Cart',
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [
        {
            fields: ['cart_user_id','cart_book_id'],
            where:{
                deleted_at: null,
            }
        }
    ]
})
export class Cart extends Model{


    @Column({
        type: DataType.BIGINT,
        allowNull: false,
        field: 'cart_book_id'
    })
    cartBookId: bigint;

    @BelongsTo(()=> Book,{
        as: 'book',
        foreignKey: {
            name: 'cartBookId'
        }
    })
    book: Book;


    @Column({
        type: DataType.BIGINT,
        allowNull: false,
        field: 'cart_user_id'
    })
    cartUserId: bigint

    @BelongsTo(() => User, {
        as: 'user',
        foreignKey: {
            name: 'cartUserId'
        }
    })
    user: User

}