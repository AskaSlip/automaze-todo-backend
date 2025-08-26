import {Injectable, NotFoundException} from '@nestjs/common';
import {CategoryReqDto} from "../models/dto/req/category.req.dto";
import {CategoryID} from "../../../common/types/entity-ids.type";
import {CategoriesRepository} from "../../repository/services/categories.repository";
import {CategoryEntity} from "../../../database/entities/category.entity";
import {RedisService} from "../../redis/services/redis.service";

@Injectable()
export class CategoryService {
    private readonly cacheKey = "categories";
    constructor(
        private readonly categoriesRepository: CategoriesRepository,
        private readonly redisService: RedisService,
    ) {
    }

    public async addCategory(dto: CategoryReqDto): Promise<CategoryEntity> {
        const category =  await this.categoriesRepository.save(
            this.categoriesRepository.create({
                ...dto,
            })
        )
        await this.redisService.addOneToSet(this.cacheKey, JSON.stringify(category));

        return category;
    }

    public async deleteCategory(category_id: CategoryID): Promise<void> {
        const category = await this.categoriesRepository.findOneBy({id: category_id});
        if (!category) {
            throw new NotFoundException(`Category not found`);
        }
        await this.categoriesRepository.delete({id: category.id});
        await this.redisService.remOneFromSet(this.cacheKey, JSON.stringify(category));
    }

    public async getAllCategories(): Promise<CategoryEntity[]> {
        const cachedCategories = await this.redisService.sMembers(this.cacheKey)
        if (cachedCategories && cachedCategories.length > 0) {
            return cachedCategories.map(cat => JSON.parse(cat));
        }

        const categories = await this.categoriesRepository.find();
        if (categories.length > 0) {
            await Promise.all(
                categories.map(cat =>
                    this.redisService.addOneToSet(this.cacheKey, JSON.stringify(cat))
                )
            );
        }
        return categories;
    }

    public async getById(category_id: CategoryID):Promise<CategoryEntity> {
        const category = await this.categoriesRepository.findOneBy({id: category_id});
        if(!category) {
            throw new NotFoundException(`Category not found`);
        }
        return category;
    }

}
