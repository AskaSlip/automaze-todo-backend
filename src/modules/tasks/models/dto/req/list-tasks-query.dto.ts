import {IsEnum, IsInt, IsOptional, IsString, Max, Min} from 'class-validator';
import { Type } from 'class-transformer';
import {StatusEnum} from "../../enums/status.enum";
import {SortEnum} from "../../../../../common/enums/sort.enum";

export class ListTasksQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(StatusEnum)
  status?: StatusEnum;

  @IsOptional()
  @IsEnum(SortEnum)
  sortByPriority?: SortEnum;

  @IsOptional()
  sortByCategory?: string

  @IsOptional()
  dateFilter?: string

  @Type(() => Number)
  @IsInt()
  @Max(300)
  @Min(1)
  @IsOptional()
  limit?: number = 50;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  offset?: number = 0;

}