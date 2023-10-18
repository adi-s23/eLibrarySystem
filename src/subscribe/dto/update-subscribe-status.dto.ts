import { IsEnum, IsInt, IsNotEmpty } from "class-validator"
import { SubscribeStatus } from "src/enums/subscribe.status.enum"

export class UpdateSubscribeStatusDto{
    @IsInt()
    @IsNotEmpty()
    bookId: bigint

    @IsEnum(SubscribeStatus)
    @IsNotEmpty()
    status: SubscribeStatus
}