import { Type } from "class-transformer";

import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

import { SERVICE_TYPE_ENUM } from '../types/open.api.enum';

import { ListQueryDto } from '@/shared/dto/list.dto';

export class CultureInfoListMapDto extends ListQueryDto {
    @IsNotEmpty({message : "gpsxfrom가 누락됐습니다."})
    @Type(() => Number)
    @IsNumber()
    gpsxfrom : number;

    @IsNotEmpty({message : "gpsyfrom가 누락됐습니다."})
    @Type(() => Number)
    @IsNumber()
    gpsyfrom : number;

    @IsNotEmpty({message : "gpsxto가 누락됐습니다."})
    @Type(() => Number)
    @IsNumber()
    gpsxto : number;

    @IsNotEmpty({message : "gpsyto가 누락됐습니다."})
    @Type(() => Number)
    @IsNumber()
    gpsyto : number;

    @IsOptional()
    @IsNotEmpty({message : "type이 누락됐습니다."})
    @IsEnum(SERVICE_TYPE_ENUM, {message : "type 값이 올바르지 않습니다."})
    type: SERVICE_TYPE;

    /** 검색 키워드 */
    @IsOptional()
    @IsString()
    keyword? : string

    /** 조회할 지역 */
    @IsOptional()
    @IsString()
    area? : DISTRICT
}
