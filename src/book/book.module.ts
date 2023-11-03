import { Module } from '@nestjs/common';
import { BookController } from './core/book.controller';
import { BookService } from './core/book.service';
import { BookRepository } from './core/book.repository';
import { DatabaseModule } from 'src/core/database/database.module';
import { RedisModule } from 'src/core/redis/redis.module';
import { ElasticSearch } from 'src/core/elasticsearch/elasticsearch.module';
import { CategoryModule } from 'src/category/category.module';
import { QueueModule } from 'src/core/queue/queue.module';

@Module({
  imports: [DatabaseModule,RedisModule,ElasticSearch,CategoryModule,QueueModule],
  controllers: [BookController],
  providers: [BookRepository, BookService],
  exports: [BookService]
})
export class BookModule {}
