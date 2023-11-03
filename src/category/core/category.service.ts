import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { Category } from '../model/category.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CategoryService {

    constructor(private categoryRepository: CategoryRepository) {

    }

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<void> {
        try {
            await this.categoryRepository.createCategory(createCategoryDto.name)
        } catch (err) {
            throw err;
        }
    }

    async isCategoryExsistByName(name: string): Promise<boolean> {
        try {
            const bool: boolean = await this.categoryRepository.isCategoryExsistsByName(name);
            return bool;
        } catch (err) {
            throw err;
        }
    }

    async getAllCategories(): Promise<CategorySchema[]> {
        try {
            const categories: Category[] = await this.categoryRepository.findAllCategories();
            const categoriesObj: CategorySchema[] = plainToInstance(CategorySchema, categories);
            return categoriesObj;
        } catch (err) {
            throw err;
        }
    }

    async findCategoryNameById(categoryId: bigint): Promise<string> {
        try {
            const category: string = await this.categoryRepository.findCategoryNameById(categoryId);
            return category;
        } catch (error) {
            throw error;
        }
    }
}
