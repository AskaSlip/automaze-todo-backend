import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';

import {CategoryService} from './services/category.service';
import {CategoryReqDto} from "./models/dto/req/category.req.dto";
import {CategoryResDto} from "./models/dto/res/category.res.dto";
import {CategoryID} from "../../common/types/entity-ids.type";
import {CategoryMapper} from "./services/category.mapper";

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {
    }

    @Post('category')
    public async addCategory(
        @Body() dto: CategoryReqDto
    ): Promise<CategoryResDto> {
        const res = await this.categoryService.addCategory(dto);
        return CategoryMapper.toResDto(res)
    }

    @Delete(':category_id')
    public async deleteCategory(
        @Param('category_id') category_id: CategoryID
    ): Promise<void> {
        return this.categoryService.deleteCategory(category_id);
    }

    @Get('/')
    public async getAllCategories(): Promise<CategoryReqDto[]> {
        const res = await this.categoryService.getAllCategories();
        return res.map(cat => CategoryMapper.toResDto(cat));
    }

    @Get(':category_id')
    public async getById(
        @Param('category_id') category_id: CategoryID
    ): Promise<CategoryResDto>{
        const res = await this.categoryService.getById(category_id)
        return CategoryMapper.toResDto(res)
    }
}
