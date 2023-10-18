import { BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";
import { Book } from "src/book/model/book.entity";
import { TransactionStatus } from "src/enums/transaction.status.enum";
import { Subscribe } from "src/subscribe/model/subscribe.entity";
import { User } from "src/user/model/user.entity";

@Table({
    timestamps: true,
    tableName: 'BookTransaction',
    underscored: true,
    indexes:[
        {
            fields: ['txn_user_id','txn_book_id'],
            type: "UNIQUE"
        }
    ]
})
export class BookTransaction extends Model{

    @Column({
        allowNull: false,
        field: 'txn_user_id'
    })
    txnUserId: bigint; 

    @BelongsTo(() => User,{
        as: 'txnUser',
        foreignKey: {
            name: 'txnUserId'
        }
    })
    txnUser: User;

    @Column({
        field: 'txn_book_id',
        type: DataType.BIGINT
    })
    txnBookId: bigint

    @BelongsTo(()=> Book,{
        as: 'txnBook',
        foreignKey:{
            name: 'txnBookId'
        }
    })
    txnBook: Book;

    @Column({
        type: DataType.ENUM(),
        values: Object.values(TransactionStatus),
        field: 'txn_status',
        allowNull: false
    })
    txnStatus: TransactionStatus

    @Column({
        type: DataType.FLOAT,
        validate: {
            min: 0
        },
        field: 'txn_price'

    })
    txnPrice: number

    @HasOne(()=> Subscribe,{
        as: 'subscribe',
        foreignKey: {
            name: 'transactionId'
        }
    })
    subscribe: Subscribe
    
}