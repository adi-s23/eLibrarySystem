import { Inject, Injectable } from "@nestjs/common";
import { SEQUELIZE } from "src/core/constants";
import { DbModels } from "src/core/database.types";
import { Category } from "../model/category.entity";


@Injectable()
export class CategoryRepository{
    constructor(@Inject(SEQUELIZE) private db: DbModels){
        
    }

    async createCategory(name: string): Promise<void>{
         const category : Category = await new this.db.Category({name : name});
         category.save();
    }

    async isCategoryExsistsByName(name:string): Promise<boolean>{
        return await this.db.Category.count({where: {name: name}}).then(count => (count>0)? true: false);
    }

    async findAllCategories(): Promise<Category[]> {
        return await this.db.Category.findAll();
    }

}