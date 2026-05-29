import { IsOptional, IsString } from 'class-validator';

import { ListQueryDto } from '@/shared/dto/list.dto';

export class FavoriteListQueryDto extends ListQueryDto {
    /** 조회할 지역 */
    @IsOptional()
    @IsString()
    type? : ""
}