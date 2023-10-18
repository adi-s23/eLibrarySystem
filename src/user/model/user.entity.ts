import { AllowNull, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Book } from "src/book/model/book.entity";
import { Cart } from "src/cart/model/cart.entity";
import { UserRole } from "src/enums/user.role.enum";
import { Subscribe } from "src/subscribe/model/subscribe.entity";
import { BookTransaction,} from "src/transaction/model/transaction.entity";

@Table({
    timestamps: true,
    tableName: 'User',
    indexes: [
        {
            name: 'email_index',
            fields: ['email']
        },
    ]
})
export class User extends Model{

    @Column({
        type: DataType.STRING,
        field: 'name',
    })
    name: string;

    @Column({
        field: 'email',
        type: DataType.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    })
    email: string;

    @Column({
        type: DataType.STRING,
        field: 'password'
    })
    password: string;

    @Column({
        type: DataType.STRING,
        field: 'jwt'
    })
    jwt: string;

    @Column({
        type: DataType.DATE,
        field: 'last_login'
    })
    lastLogin: Date;

    @Column({
        type: DataType.ENUM(...Object.values(UserRole)),
        field: 'role'
    })
    role: UserRole

    @HasMany(()=>Book,{
        foreignKey:{
            name: 'createdBy'
        }
    })
    book: Book[]

    @HasMany(()=>Cart,{
        foreignKey: {
            name: 'cartUserId'
        }
    })
    cart: Cart[]

    @HasMany(() => BookTransaction,{
        as: 'transactions',
        foreignKey:{
            name: 'txnUserId'
        }
    })
    transactions: BookTransaction[]

    @HasMany(() => Subscribe,{
        as: 'subscribers',
        foreignKey: {
            name: 'subscribedUserId'
        }
    })
    subscribers: Subscribe[]


}

