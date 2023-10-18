import { BadRequestException, Body, Controller, Delete, Get, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { CartService } from './cart.service';
import { Request } from 'express';
import { Roles } from 'src/auth/role/roles.decorator';
import { UserRole } from 'src/enums/user.role.enum';
import { JWTGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { UserInterceptor } from 'src/core/interceptors/user.interceptor';
import { AddToCartDto } from '../dto/add-to-cart.dto';

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
        return this.cartService.findCartByUserId(req.body.userId);
        }catch{
            throw new BadRequestException({message: "Error in finding cart"})
        }

    }

    @Roles(UserRole.USER)
    @UseGuards(JWTGuard,RoleGuard)
    @UseInterceptors(UserInterceptor)
    @Post()
    async addBookToCart(@Req() req: Request,@Body() addToCartDto: AddToCartDto){
        try{
            this.cartService.addBookToCart(req.body.userId,addToCartDto.bookId);
        }catch(err){

        }
    }

    @Roles(UserRole.USER)
    @UseGuards(JWTGuard,RoleGuard)
    @UseInterceptors(UserInterceptor)
    @Delete()
    async deleteBookInCart(@Req() req: Request,@Body() addToCartDto: AddToCartDto){
        try{
            this.cartService.deleteBookInCart(req.body.userId,addToCartDto.bookId);
        }catch(err){

        }
    }
    


}
