import { Module } from '@nestjs/common';
import { TransactionService } from './core/transaction.service';
import { TransactionController } from './core/transaction.controller';
import { TransactionRepository } from './core/transaction.repository';
import { DatabaseModule } from 'src/core/database/database.module';
import { BookModule } from 'src/book/book.module';
import { SubscribeModule } from 'src/subscribe/subscribe.module';
import { Sequelize } from 'sequelize';

@Module({
  imports: [BookModule, DatabaseModule,SubscribeModule],
  providers: [TransactionService,TransactionRepository],
  controllers: [TransactionController],
  exports: [TransactionService]
})
export class TransactionModule {}
