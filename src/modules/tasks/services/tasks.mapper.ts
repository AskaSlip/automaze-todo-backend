import {TaskEntity} from "../../../database/entities/task.entity";
import {TaskResDto} from "../models/dto/res/task.res.dto";
import {ListTasksQueryDto} from "../models/dto/req/list-tasks-query.dto";
import {ListTasksResDto} from "../models/dto/res/list-tasks.res.dto";

export class TasksMapper {
    public static toResDto(task: TaskEntity): TaskResDto {
        return {
            id: task.id,
            task: task.task,
            status: task.status,
            priority: task.priority,
            dueDate: task.dueDate,
            category_id: task.category_id
        }
    }

    public static toResDtoList(
        data: TaskEntity[],
        total: number,
        query: ListTasksQueryDto,
    ): ListTasksResDto {
        return {
            data: data.map((trip) => this.toResDto(trip)),
            total,
            ...query
        };
    }
}