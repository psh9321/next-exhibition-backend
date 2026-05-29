import { Type } from "class-transformer";
import { IsNumber, IsNotEmpty } from 'class-validator';

export class ListQueryDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty({message : "offset이 누락됐습니다."})
  offset: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty({message : "limit이 누락됐습니다."})
  limit: number;
}