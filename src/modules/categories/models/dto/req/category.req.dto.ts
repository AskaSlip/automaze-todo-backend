import {IsString} from 'class-validator';

export class CategoryReqDto {
    @IsString()
    category: string;
}
