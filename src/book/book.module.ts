import { Module } from '@nestjs/common';
import { BookController } from './core/book.controller';
import { BookService } from './core/book.service';
import { BookRepository } from './core/book.repository';
import { DatabaseModule } from 'src/core/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [BookController],
  providers: [BookRepository, BookService],
  exports: [BookService]
})
export class BookModule {}
