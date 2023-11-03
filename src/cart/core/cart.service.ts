import { Injectable } from '@nestjs/common';
import { CartRepository } from './cart.repository';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class CartService {

    constructor(private cartRepository: CartRepository,
            private eventemitter: EventEmitter2){

    }

    async findCartByUserId(userId: bigint){
        try{
            const cart = await this.cartRepository.findCartbyUserId(userId);
            return cart;
        }catch(err){
            throw err;
        }
    }

    async addBookToCart(userId: bigint, bookId: bigint): Promise<void>{
        try{
            await this.cartRepository.insertBookInCart(userId,bookId);
        }catch(err){
            throw err;
        }
    }

    async deleteBookInCart(userId: bigint, bookId: bigint): Promise<void>{
        try{
            await this.cartRepository.deleteBookInCart(userId,bookId);
        }catch(err){
            throw err;
        }
    }

    async checkOutCart(userId: bigint){
        try {
            const cartBooks = await this.cartRepository.findCartItemsbyUserId(userId);
            await this.eventemitter.emit('checkout',cartBooks);
            await this.cartRepository.deleteUserBooksInCart(userId)
            this
        } catch (error) {
            throw error;
        }
    }
}
