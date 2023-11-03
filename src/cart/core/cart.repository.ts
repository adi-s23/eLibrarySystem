import { Inject, Injectable } from "@nestjs/common";
import { SEQUELIZE } from "src/core/constants";
import { DbModels } from "src/core/database.types";
import { Cart } from "../model/cart.entity";
import { Book } from "src/book/model/book.entity";

@Injectable()
export class CartRepository {

    constructor(@Inject(SEQUELIZE) private db: DbModels) {

    }

    async findCartbyUserId(userId: bigint): Promise<Cart[]> {
        try {
            const cart = await this.db.Cart.findAll({
                include: { model: Book, required: true }, where: {
                    cartUserId: userId
                }
            });
            return cart;
        } catch (error) {
            throw error;
        }
    }

    async findCartItemsbyUserId(userId: bigint): Promise<Cart[]> {
        try {
            const cart = await this.db.Cart.findAll({ where: {
                    cartUserId: userId
                },raw: true
            });
            return cart;
        } catch (error) {
            throw error;
        }
    }

    async insertBookInCart(userId: bigint, bookId: bigint): Promise<void> {
        try {
            const cart: Cart = await new this.db.Cart({
                cartUserId: userId,
                cartBookId: bookId
            })
            await cart.save();
        } catch (err) {
            throw err;
        }
    }


    async deleteBookInCart(userId: bigint, bookId: bigint): Promise<void> {
        
        try {
            await this.db.Cart.destroy({
                where: {
                    cartUserId: userId,
                    cartBookId: bookId
                }
            })
        } catch (error) {
            throw error;
        }

    }

    async deleteUserBooksInCart(userId: bigint): Promise<void> {
        
        try {
            await this.db.Cart.destroy({
                where: {
                    cartUserId: userId
                }
            })
        } catch (error) {
            throw error;
        }

    }

} 