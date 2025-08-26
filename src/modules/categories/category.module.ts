import { Module } from '@nestjs/common';

import { CategoryController } from './category.controller';
import { CategoryService } from './services/category.service';
import {RedisModule} from "../redis/redis.module";

@Module({
  imports: [RedisModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
