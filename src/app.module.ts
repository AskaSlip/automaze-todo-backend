import {Module} from '@nestjs/common';

import {TasksModule} from './modules/tasks/tasks.module';
import {RepositoryModule} from "./modules/repository/repository.module";
import {ConfigModule} from "@nestjs/config";
import configuration from "./configs/configuration";
import {PostgresModule} from "./modules/postgres/postgres.module";
import {CategoryModule} from "./modules/categories/category.module";
import {RedisModule} from "./modules/redis/redis.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            isGlobal: true,
            envFilePath: 'backend/.env',
        }),
        TasksModule,
        RepositoryModule,
        PostgresModule,
        CategoryModule,
        RedisModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
