import {Injectable, NotFoundException} from '@nestjs/common';
import {TasksRepository} from "../../repository/services/tasks.repository";
import {TaskReqDto} from "../models/dto/req/task.req.dto";
import {StatusEnum} from "../models/enums/status.enum";
import {CategoryID, TaskID} from "../../../common/types/entity-ids.type";
import {TaskUpdateReqDto} from "../models/dto/req/task-update.req.dto";
import {TaskEntity} from "../../../database/entities/task.entity";
import {ListTasksQueryDto} from "../models/dto/req/list-tasks-query.dto";

@Injectable()
export class TasksService {
    constructor(
        private readonly tasksRepository: TasksRepository
    ) {
    }

    public async createTask(dto: TaskReqDto): Promise<TaskEntity> {
        return await this.tasksRepository.save(
            this.tasksRepository.create({
                ...dto,
                status: StatusEnum.UNDONE,
            })
        )
    }

    public async deleteTask(task_id: TaskID): Promise<void> {
        const task = await this.isTaskExist(task_id);

        await this.tasksRepository.delete({id: task.id});
    }

    public async updateTask(task_id: TaskID, dto: TaskUpdateReqDto): Promise<TaskEntity> {
        const task = await this.isTaskExist(task_id);

        const updatedTask = {
            ...task,
            ...dto,
        }
        return await this.tasksRepository.save(updatedTask);
    }

    public async updateStatus(task_id: TaskID): Promise<TaskEntity> {
        const task = await this.isTaskExist(task_id);

        const updatedStatus = task.status === StatusEnum.DONE ? StatusEnum.UNDONE : StatusEnum.DONE;
        return await this.tasksRepository.save({
            ...task,
            status: updatedStatus,
        });
    }

    public async getAllTasks(query: ListTasksQueryDto): Promise<[TaskEntity[], number]> {
        return await this.tasksRepository.findAll({...query});
    }

    public async assignCategory(task_id: TaskID, category_id: CategoryID): Promise<TaskEntity> {
        const task = await this.isTaskExist(task_id);

        return await this.tasksRepository.save({
            ...task,
            category_id: category_id,
        });
    }

    public async deleteCategory(task_id:TaskID):Promise<TaskEntity>{
        const task = await this.isTaskExist(task_id);
        return await this.tasksRepository.save({
            ...task,
            category_id: null
        })

    }

    public async getById(task_id: TaskID): Promise<TaskEntity> {
        return await this.isTaskExist(task_id);
    }


    private async isTaskExist(id: TaskID){
        const task = await this.tasksRepository.findOneBy({id: id});
        if (!task) {
            throw new NotFoundException(`Task not found`);
        }
        return task;
    }
}
