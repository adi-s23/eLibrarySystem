import { Exclude } from "class-transformer";
import { HideStatus } from "src/enums/book.hidden.status.enum";

export class BookSchema {
    id: bigint
    bookName: string;
    categoryId: bigint;
    price: number;
    description: string;
    createdBy: bigint;
    hideStatus: HideStatus;
    @Exclude()
    createdAt: Date;
    @Exclude()
    updatedAt: Date;
    @Exclude()
    deletedAt: Date;
}