import { Inject, Injectable } from "@nestjs/common";
import { SEQUELIZE } from "src/core/constants";
import { DbModels } from "src/core/database.types";
import { Category } from "../model/category.entity";
import e from "express";


@Injectable()
export class CategoryRepository{
    constructor(@Inject(SEQUELIZE) private db: DbModels){
        
    }

    async createCategory(name: string): Promise<void>{
        try {
            const category : Category = await new this.db.Category({name : name});
            category.save();
        } catch (error) {
            throw error;
        }
    }

    async isCategoryExsistsByName(name:string): Promise<boolean>{
        try{
            const bool = await this.db.Category.count({where: {name: name}}).then(count => (count>0)? true: false);
            return bool;
        }catch(err){
            throw err;
        }
    }

    async findAllCategories(): Promise<Category[]> {
        try {
        const categories = await this.db.Category.findAll();
        return categories;
        } catch (error) {
            throw error;
        }
    }

    async findCategoryNameById(categoryId: bigint): Promise<string>{
        try{
        const categories = await this.db.Category.findByPk(categoryId).then((category)=> category.name);
        return categories;
        }catch(error){
            throw error;
        }
    }

}