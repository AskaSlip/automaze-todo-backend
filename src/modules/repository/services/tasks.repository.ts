import {Injectable} from '@nestjs/common';
import {DataSource, Repository} from 'typeorm';
import {TaskEntity} from "../../../database/entities/task.entity";
import {ListTasksQueryDto} from "../../tasks/models/dto/req/list-tasks-query.dto";

@Injectable()
export class TasksRepository extends Repository<TaskEntity> {
    constructor(private readonly dataSource: DataSource) {
        super(TaskEntity, dataSource.manager);
    }

     public async findAll(
          query: ListTasksQueryDto
        ): Promise<[TaskEntity[], number]>{
            const qb = this.createQueryBuilder('tasks');

         if (query.search) {
             qb.andWhere('tasks.task ILIKE :search', { search: `%${query.search}%` });
         }

         if (query.status) {
             qb.andWhere('tasks.status = :status', { status: query.status });
         }

         if (query.sortByPriority) {
             qb.orderBy('tasks.priority', query.sortByPriority.toUpperCase() as 'ASC' | 'DESC');
         }

         if (query.sortByCategory) {
             qb.andWhere('tasks.category_id = :category_id', { category_id: query.sortByCategory } );
         }

         if (query.dateFilter === 'today') {
             qb.andWhere('tasks.dueDate = CURRENT_DATE');
         }

         if (query.dateFilter === 'upcoming') {
             qb.andWhere('tasks.dueDate > CURRENT_DATE');
         }

         qb.skip(query.offset).take(query.limit);

         return await qb.getManyAndCount();
     }

}