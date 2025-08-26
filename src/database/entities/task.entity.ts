import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {CategoryID, TaskID} from '../../common/types/entity-ids.type';
import {StatusEnum} from "../../modules/tasks/models/enums/status.enum";
import {CategoryEntity} from "./category.entity";

@Entity('tasks')

export class TaskEntity {
    @PrimaryGeneratedColumn('uuid')
    id: TaskID;

    @Column('text')
    task: string;

    @Column('enum', {enum: StatusEnum, default: StatusEnum.UNDONE})
    status: StatusEnum;

    @Column('date', {nullable: true})
    dueDate: string;

    @Column('int')
    priority: number;

    @Column({ type: 'uuid', nullable: true })
    category_id: CategoryID | null;
    @ManyToOne(() => CategoryEntity, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'category_id' })
    category?: CategoryEntity;

}