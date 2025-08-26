import {Global, Module} from '@nestjs/common';
import {TasksRepository} from "./services/tasks.repository";
import {CategoriesRepository} from "./services/categories.repository";


const repositories = [
    TasksRepository,
    CategoriesRepository
];

@Global()
@Module({
    providers: [...repositories],
    exports: [...repositories],
})
export class RepositoryModule {
}