import { IsBooleanString, IsNotEmpty } from 'class-validator';

import { ListQueryDto } from '@/shared/dto/list.dto';
import { Type } from 'class-transformer';

export class ReviewListQueryDto extends ListQueryDto {
    /** 내가 쓴 리뷰 조회 여부 */
    @IsNotEmpty({message : "my가 누락됐습니다."})
    @IsBooleanString({
        message : "my값이 올바르지 않습니다.",
    })
    my : "true" | "false"
}

export class ReviewListParamDto {
    @Type(() => String)
    /** 불러올 리뷰의 전시 seq */
    @IsNotEmpty({message : "my가 누락됐습니다."})
    seq : string
}