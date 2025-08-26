import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';

import { TasksService } from './services/tasks.service';
import {TaskReqDto} from "./models/dto/req/task.req.dto";
import {TaskResDto} from "./models/dto/res/task.res.dto";
import {CategoryID, TaskID} from "../../common/types/entity-ids.type";
import {TaskUpdateReqDto} from "./models/dto/req/task-update.req.dto";
import {TasksMapper} from "./services/tasks.mapper";
import {ListTasksQueryDto} from "./models/dto/req/list-tasks-query.dto";
import {ListTasksResDto} from "./models/dto/res/list-tasks.res.dto";

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('task')
   public async createTask(
       @Body() dto: TaskReqDto
  ): Promise<TaskResDto> {
    const res = await this.tasksService.createTask(dto);
    return TasksMapper.toResDto(res)
  }

  @Delete(':task_id')
  public async deleteTask(
    @Param('task_id') task_id: TaskID
  ): Promise<void> {
    return this.tasksService.deleteTask(task_id);
  }

  @Patch(':task_id')
    public async updateTask(
        @Param('task_id') task_id: TaskID,
        @Body() dto: TaskUpdateReqDto
    ): Promise<TaskResDto> {
        const res = await this.tasksService.updateTask(task_id, dto);
        return TasksMapper.toResDto(res);
    }

    @Post('update-status/:task_id')
    public async updateStatus(
        @Param('task_id') task_id: TaskID,
    ): Promise<TaskResDto> {
        const res = await this.tasksService.updateStatus(task_id);
        return TasksMapper.toResDto(res);
    }

    @Get('/')
    public async getAllTasks(
        @Query() query: ListTasksQueryDto
    ): Promise<ListTasksResDto> {
        const [entities, total] = await this.tasksService.getAllTasks(query);
        return TasksMapper.toResDtoList(entities, total, query);
    }

    @Get(':task_id')
    public async getById(
        @Param('task_id') task_id: TaskID,
    ): Promise<TaskResDto> {
      const res = await this.tasksService.getById(task_id);
      return TasksMapper.toResDto(res);
    }

    @Post('assign-category/:task_id')
    public async assignCategory(
        @Param('task_id') task_id: TaskID,
        @Body('category_id') category_id: CategoryID
    ): Promise <TaskResDto>{
      const res = await this.tasksService.assignCategory(task_id, category_id);
      return TasksMapper.toResDto(res);
    }

  @Post('delete-category/:task_id')
  public async deleteCategory(
      @Param('task_id') task_id: TaskID,
  ): Promise <TaskResDto>{
    const res = await this.tasksService.deleteCategory(task_id);
    return TasksMapper.toResDto(res);
  }
}
