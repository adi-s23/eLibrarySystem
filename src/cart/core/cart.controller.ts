import { BadRequestException, Body, Controller, Delete, Get, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { CartService } from './cart.service';
import { Request } from 'express';
import { Roles } from 'src/auth/role/roles.decorator';
import { UserRole } from 'src/enums/user.role.enum';
import { JWTGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { UserInterceptor } from 'src/core/interceptors/user.interceptor';
import { AddToCartDto } from '../dto/add-to-cart.dto';
import { triggerAsyncId } from 'async_hooks';

@Controller('cart')
export class CartController {

    constructor(private cartService: CartService){

    }
    
    @Roles(UserRole.USER)
    @UseGuards(JWTGuard,RoleGuard)
    @UseInterceptors(UserInterceptor)
    @Get()
    async findCartItemsByUser(@Req() req:Request){
        try{
        const cart = await this.cartService.findCartByUserId(req.body.userId);
        return cart;
        }catch{
            throw new BadRequestException({message: "Error in finding cart"})
        }

    }

    @Roles(UserRole.USER)
    @UseGuards(JWTGuard,RoleGuard)
    @UseInterceptors(UserInterceptor)
    @Post()
    async addBookToCart(@Req() req: Request,@Body() addToCartDto: AddToCartDto): Promise<void>{
        try{
            await this.cartService.addBookToCart(req.body.userId,addToCartDto.bookId);
        }catch(err){
            throw new BadRequestException({message: "Error in adding to cart"});
        }
    }

    @Roles(UserRole.USER)
    @UseGuards(JWTGuard,RoleGuard)
    @UseInterceptors(UserInterceptor)
    @Delete()
    async deleteBookInCart(@Req() req: Request,@Body() addToCartDto: AddToCartDto): Promise<void>{
        try{
            await this.cartService.deleteBookInCart(req.body.userId,addToCartDto.bookId);
        }catch(err){
            throw err;
        }
    }
    
    @Roles(UserRole.USER)
    @UseGuards(JWTGuard,RoleGuard)
    @UseInterceptors(UserInterceptor)
    @Delete('all')
    async checkOutCart(@Req() req: Request){
        try {
            await this.cartService.checkOutCart(req.body.userId);
        } catch (error) {
            throw error;
        }
    }

    


}
