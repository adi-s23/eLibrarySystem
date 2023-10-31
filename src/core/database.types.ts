import { Book } from "src/book/model/book.entity";
import { Cart } from "src/cart/model/cart.entity";
import { Category } from "src/category/model/category.entity";
import { UserSession } from "src/session/model/session.entity";
import { Subscribe } from "src/subscribe/model/subscribe.entity";
import { BookTransaction } from "src/transaction/model/transaction.entity";
import { User } from "src/user/model/user.entity";

export type DbModels = {
    Category: typeof Category
    User: typeof User
    Book : typeof Book
    Cart: typeof Cart
    BookTransaction: typeof BookTransaction
    Subscribe: typeof Subscribe
    UserSession: typeof UserSession
}