import { IsEnum, IsInt, IsNotEmpty } from "class-validator"
import { HideStatus } from "src/enums/book.hidden.status.enum";
import { UserRole } from "src/enums/user.role.enum"

export class UpdateBookStatusDto{

    @IsNotEmpty()
    @IsInt()
    bookId: bigint

    @IsEnum(HideStatus)
    @IsNotEmpty()
    status: string;
}