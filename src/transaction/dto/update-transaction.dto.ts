import { TransactionStatus } from "src/enums/transaction.status.enum"

export class UpdateTxnStatusDto{
    userId?: bigint
    bookId: bigint
}