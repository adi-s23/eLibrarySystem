import { Inject, Injectable } from "@nestjs/common";
import { SEQUELIZE } from "src/core/constants";
import { DbModels } from "src/core/database.types";
import { Cart } from "../model/cart.entity";
import { Book } from "src/book/model/book.entity";

@Injectable()
export class CartRepository{

    constructor(@Inject(SEQUELIZE) private db : DbModels){

    }

    async findCartbyUserId(userId: bigint){
        const cart = await this.db.Cart.findAll({include: {model: Book, required: true},where:{
            cartUserId: userId
        }});
        return cart;
    }

    async insertBookInCart(userId:bigint,bookId: bigint){
        const cart: Cart = await new this.db.Cart({
            cartUserId: userId,
            cartBookId: bookId
        })
        cart.save();
    }

    async EmptyCart(userId: bigint){

    }

    async deleteBookInCart(userId: bigint,bookId){
        await this.db.Cart.destroy({where: {
            cartUserId: userId,
            cartBookId: bookId
        }})
        
    }

} 