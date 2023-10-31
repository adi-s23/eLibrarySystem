import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { Category } from '../model/category.entity';

@Injectable()
export class CategoryService {

    constructor(private categoryRepository: CategoryRepository){

    }

    async createCategory(createCategoryDto: CreateCategoryDto) : Promise<void> {
        try{
        await this.categoryRepository.createCategory(createCategoryDto.name)
        }catch(err){

        }
    }

    async isCategoryExsistByName(name: string){
        try{
        return await this.categoryRepository.isCategoryExsistsByName(name);
        }catch(err){
            
        }
    }

    async getAllCategories(): Promise<Category[]> {
        try{
        return await this.categoryRepository.findAllCategories();
        }catch(err){

        }
    }

    async findCategoryNameById(categoryId: bigint){
        try {
            return await this.categoryRepository.findCategoryNameById(categoryId)
        } catch (error) {
            
        }
    }
}
