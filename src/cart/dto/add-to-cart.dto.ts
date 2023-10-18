import { IsNotEmpty, IsInt } from "class-validator";

export class AddToCartDto{

    @IsInt()
    @IsNotEmpty()
    bookId: bigint;
}