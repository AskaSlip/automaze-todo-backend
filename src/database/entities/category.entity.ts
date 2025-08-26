import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {CategoryID} from '../../common/types/entity-ids.type';
import {TaskEntity} from "./task.entity";

@Entity('category')

export class CategoryEntity {
    @PrimaryGeneratedColumn('uuid')
    id: CategoryID;

    @Column('text')
    category: string;

    @OneToMany(() => TaskEntity, (entity) => entity.category, { nullable: true })
    tasks: TaskEntity[];

}