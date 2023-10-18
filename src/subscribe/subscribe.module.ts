import { Module } from '@nestjs/common';
import { SubscribeService } from './core/subscribe.service';
import { SubscribeController } from './core/subscribe.controller';
import { SubscribeRepository } from './core/subscribe.repository';
import { DatabaseModule } from 'src/core/database/database.module';
import { TransactionModule } from 'src/transaction/transaction.module';
import { BookModule } from 'src/book/book.module';

@Module({
  imports: [DatabaseModule,BookModule],
  providers: [SubscribeService,SubscribeRepository],
  controllers: [SubscribeController],
  exports: [SubscribeService]
})
export class SubscribeModule {}
