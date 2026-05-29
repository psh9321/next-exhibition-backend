import { Type } from "class-transformer";
import { IsString, IsNotEmpty } from 'class-validator';

export class FavoriteToggleDto {
    @IsString()
    @IsNotEmpty({message : "imgUrl이 누락됐습니다."})
    imgUrl : string;

    @IsString()
    @IsNotEmpty({message : "title이 누락됐습니다."})
    title : string;

    @Type(() => String)
    @IsString()
    @IsNotEmpty({message : "startDate가 누락됐습니다."})
    startDate : string;

    @Type(() => String)
    @IsString()
    @IsNotEmpty({message : "endDate가 누락됐습니다."})
    endDate : string;

    @Type(() => String)
    @IsString()
    @IsNotEmpty({message : "seq가 누락됐습니다."})
    seq : string;

    @IsString()
    @IsNotEmpty({message : "area가 누락됐습니다."})
    area: DISTRICT
}