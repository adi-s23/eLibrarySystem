import { TransactionStatus } from "src/enums/transaction.status.enum"

export class TransactionCreateDto {
    userId: bigint
    bookId: bigint
    price: number
    txnStatus: TransactionStatus
}