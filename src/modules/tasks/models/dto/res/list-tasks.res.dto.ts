import {ListTasksQueryDto} from "../req/list-tasks-query.dto";
import {TaskResDto} from "./task.res.dto";

export class ListTasksResDto extends ListTasksQueryDto {
    data: TaskResDto[];
    total: number;
}