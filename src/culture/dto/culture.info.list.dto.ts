import { IsOptional, IsNotEmpty, IsEnum, IsString } from 'class-validator';

import { SERVICE_TYPE_ENUM } from '../types/open.api.enum';
import { ListQueryDto } from '@/shared/dto/list.dto';

export class CultureInfoListQueryDto extends ListQueryDto {
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
