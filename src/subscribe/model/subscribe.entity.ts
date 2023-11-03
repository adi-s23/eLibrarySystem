import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Book } from "src/book/model/book.entity";
import { SubscribeStatus } from "src/enums/subscribe.status.enum";
import { BookTransaction } from "src/transaction/model/transaction.entity";
import { User } from "src/user/model/user.entity";

@Table({
    tableName: 'Subscribe',
    timestamps: true,
    underscored: true,
    indexes: [
        {
            fields: ['subscribed_book_id','subscribed_user_id'],
            type: "UNIQUE",
            where: {
                deletedAt: null
            }
        },
        {
            fields: ['subscribed_user_id', 'subscribe_status']
        }
    ]
    
})
export class Subscribe extends Model{
    
    @Column({
        type: DataType.BIGINT,
        allowNull: false,
        field: 'subscribed_book_id'
    })
    subscribedBookId: bigint

    @BelongsTo(() => Book,{
        as: 'subscribeBook',
        foreignKey: {
            name: 'subscribedBookId'
        }
    })
    subscribeBook: Book

    @Column({
        allowNull: false,
        field: 'subscribed_user_id'
    })
    subscribedUserId: bigint;
    @BelongsTo(() => User,{
        as: 'subscribeUser',
        foreignKey: {
            name: 'subscribedUserId'
        }
    })
    subscribeUser: User

    @Column({
        type: DataType.BIGINT,
        field: 'transaction_id',
        allowNull: false,
    })
    transactionId: bigint
    @BelongsTo(()=> BookTransaction,{
        as: 'transaction',
        foreignKey: {
            name: 'transactionId'
        }
    })
    transaction: BookTransaction

    @Column({
        type: DataType.ENUM(),
        values: Object.values(SubscribeStatus),
        field: 'subscribe_status'
    })
    subscribeStatus: SubscribeStatus
}