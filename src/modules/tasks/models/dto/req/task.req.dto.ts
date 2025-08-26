import {IsEnum, IsString, IsInt, Max, Min, IsOptional, IsDateString} from 'class-validator';

import {StatusEnum} from '../../enums/status.enum';

export class TaskReqDto {
    @IsString()
    task: string;

    @IsEnum(StatusEnum)
    @IsOptional()
    status: StatusEnum;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(10)
    priority: number;

    @IsDateString()
    @IsOptional()
    dueDate?: string;

}
