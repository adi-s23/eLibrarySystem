import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { BookModule } from './book/book.module';
import { SubscribeModule } from './subscribe/subscribe.module';
import { CartModule } from './cart/cart.module';
import { TransactionModule } from './transaction/transaction.module';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './core/redis/redis.module';
import { ElasticSearch } from './core/elasticsearch/elasticsearch.module';
import { ScheduleModule } from '@nestjs/schedule';
import { RequestBlockerMiddleware } from './core/middleware/request-blocker.middleware';
import { QueueModule } from './core/queue/queue.module';
import { ConsumerModule } from './core/worker/consumer.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    ScheduleModule.forRoot(),
    QueueModule,
    ConsumerModule,
    DatabaseModule,
    UserModule,
    CategoryModule,
    BookModule,
    SubscribeModule,
    CartModule,
    TransactionModule,
    AuthModule,
    RedisModule,
    ElasticSearch],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule{
  
}
