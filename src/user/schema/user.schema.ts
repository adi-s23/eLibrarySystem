import { Exclude } from "class-transformer";
import { UserRole } from "src/enums/user.role.enum";

export class UserSchema{
    id: bigint;
    name: string;
    email: string;
    @Exclude()
    password: string;
    role: UserRole;
    @Exclude()
    createdAt: Date;
    @Exclude()
    updatedAt: Date;
    @Exclude()
    deletedAt: Date;
}