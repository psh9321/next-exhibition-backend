import { IsNotEmpty } from "class-validator";

export class CultureInfoDetailDto {
    @IsNotEmpty({message : "전시 req 값이 누락됐습니다."})
    seq : string
}