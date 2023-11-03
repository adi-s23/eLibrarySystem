import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { CategoryService } from './category.service';
import { Category } from '../model/category.entity';
import { JwtModule } from '@nestjs/jwt';
import { JWTGuard } from 'src/auth/jwt.guard';
import { Roles } from 'src/auth/role/roles.decorator';
import { UserRole } from 'src/enums/user.role.enum';
import { RoleGuard } from 'src/auth/role/role.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('category')
export class CategoryController {

    constructor(private categoryService: CategoryService) {

    }

    @Get()
    @UseGuards(JWTGuard)
    async getAllCategories(): Promise<CategorySchema[]> {
        try {
            const categories: CategorySchema[] = await this.categoryService.getAllCategories();
            return categories;
        } catch (error) {
            throw error;
        }
    }

    @Roles(UserRole.ADMIN)
    @UseGuards(JWTGuard, RoleGuard)
    @Post()
    async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<string> {

        try {
            const categoryExsists: boolean = await this.categoryService.isCategoryExsistByName(createCategoryDto.name)
            if (categoryExsists) {
                return "Category Already Exixts";
            }
            await this.categoryService.createCategory(createCategoryDto);
            return "Category Created";
        } catch (error) {
            throw error;
        }
    }


}
