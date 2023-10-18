import { Module } from '@nestjs/common';
import { CartController } from './core/cart.controller';
import { CartService } from './core/cart.service';
import { CartRepository } from './core/cart.repository';
import { DatabaseModule } from 'src/core/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CartController],
  providers: [CartService,CartRepository]
})
export class CartModule {}
