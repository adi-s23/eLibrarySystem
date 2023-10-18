import { Module } from '@nestjs/common';
import { CategoryService } from './core/category.service';
import { CategoryController } from './core/category.controller';
import { CategoryRepository } from './core/category.repository';
import { databaseProviders } from 'src/core/database/database.provider';
import { DatabaseModule } from 'src/core/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [CategoryService,CategoryRepository],
  controllers: [CategoryController]
})
export class CategoryModule {}
