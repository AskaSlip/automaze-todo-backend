import {StatusEnum} from "../../enums/status.enum";
import {TaskID} from "../../../../../common/types/entity-ids.type";

export class TaskResDto {
    id: TaskID;
    task: string;
    status: StatusEnum;
    priority: number;
    dueDate?: string;
    category_id?: string | null;
}