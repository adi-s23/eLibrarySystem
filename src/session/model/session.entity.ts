import { BelongsTo, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "src/user/model/user.entity";

@Table({
    tableName: 'Session',
    timestamps: true,
    paranoid: true,
    underscored: true
})
export class UserSession extends Model{

    @Column({
        type: DataType.STRING,
        field: 'jwt'
    })
    jwt: string

    @Column({
        type: DataType.DATE,
        field: 'last_login'
    })
    lastLogin: Date

    @Column({
        type: DataType.BIGINT,
        field: 'user_id'
    })
    userId: bigint

    @BelongsTo(()=>User,{
        as: 'user',
        foreignKey: {
            name: 'userId'
        }
    })
    user: User


}