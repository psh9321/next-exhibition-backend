import { Type } from "class-transformer";
import { IsString, IsNotEmpty } from 'class-validator';

export class ReviewAddDto {
    @IsString()
    @IsNotEmpty({message : "reviewContents가 누락됐습니다."})
    reviewContents : string;

    @Type(() => String)
    @IsString()
    @IsNotEmpty({message : "exhibitionSeq가 누락됐습니다."})
    exhibitionSeq : string;
}

export class ReviewUpdateDto {
    @IsString()
    @IsNotEmpty({message : "reviewContents가 누락됐습니다."})
    reviewContents : string;
}