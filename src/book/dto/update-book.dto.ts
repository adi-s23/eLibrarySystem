import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class UpdateBookDto {

    @IsNotEmpty()
    @IsInt()
    bookId: bigint

    @IsString()
    @IsNotEmpty()
    name: string


    @IsNumber()
    @IsNotEmpty()
    price: number
    
    @IsString()
    description: string

}