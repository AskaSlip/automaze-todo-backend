import {CategoryResDto} from "../models/dto/res/category.res.dto";
import {CategoryEntity} from "../../../database/entities/category.entity";

export class CategoryMapper {
    public static toResDto(category: CategoryEntity): CategoryResDto {
        return {
            id: category.id,
            category: category.category
        }
    }

    // public static toResDtoList(
    //     data: TaskEntity[],
    //     total: number,
    //     query: ListTasksQueryDto,
    // ): ListTasksResDto {
    //     return {
    //         data: data.map((trip) => this.toResDto(trip)),
    //         total,
    //         ...query
    //     };
    // }
}