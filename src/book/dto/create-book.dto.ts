import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateBookDto {

    @IsString()
    @IsNotEmpty()
    name: string

    @IsNumber()
    @IsNotEmpty()
    categoryId: bigint

    @IsNumber()
    @IsNotEmpty()
    price: number

}