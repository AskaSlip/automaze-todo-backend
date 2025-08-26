import {IsInt, IsOptional, Max, Min} from 'class-validator';

export class TaskUpdateReqDto {
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(10)
    priority: number;

}
