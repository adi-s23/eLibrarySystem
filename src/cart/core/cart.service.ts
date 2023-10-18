import { Injectable } from '@nestjs/common';
import { CartRepository } from './cart.repository';

@Injectable()
export class CartService {

    constructor(private cartRepository: CartRepository){

    }

    async findCartByUserId(userId: bigint){
        try{
            return this.cartRepository.findCartbyUserId(userId);
        }catch(err){

        }
    }

    async addBookToCart(userId: bigint, bookId: bigint){
        try{
            this.cartRepository.insertBookInCart(userId,bookId);
        }catch(err){

        }
    }

    async deleteBookInCart(userId: bigint, bookId: bigint){
        try{
            this.cartRepository.deleteBookInCart(userId,bookId);
        }catch(err){

        }
    }
}
