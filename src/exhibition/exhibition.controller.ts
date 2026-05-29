import { Controller, Get, Param, Delete, Query, Req } from '@nestjs/common';

import type { Request } from 'express';

import { ExhibitionService } from './exhibition.service';
import { ExhibitionListQueryDto } from './dto/exihibition.list.dto';
import { ApiError, ApiFail, ApiSuccess } from '@/shared/api/response';
import { ExhibitionDetailInfoDto } from './dto/exhibition.detail.info.dto';
import { AuthService } from '@/auth/auth.service';

@Controller('exhibition')
export class ExhibitionController {
  constructor(
    private readonly exhibitionService: ExhibitionService,
    private readonly authService: AuthService,
  ) {}

  @Get("list")
  async OpenApiExhibitionList(
    @Query() query : ExhibitionListQueryDto,
  ) {

    try {

      const data = await this.exhibitionService.GetOpenApiData(query);

      if(!data) return new ApiFail(data, "전시정보 불러오기 실패");
      
      return new ApiSuccess(data);
    }
    catch(err) {
      throw new ApiError(err, "전시정보 불러오기 에러")
    }
  }

  @Get('detail')
  ExhibitionTargetDetailError() {
    return new ApiError(null, "전시 req 값이 누락됐습니다.")
  }

  @Get('detail/:seq')
  async ExhibitionDetailInfo(
    @Param() param: ExhibitionDetailInfoDto,
    @Req() req: Request
  ) {
    try {
      
      const data = await this.exhibitionService.GetOpenApiDetailData(param["seq"], req._id);

      if(!data) return new ApiFail(data, "전시 상세정보 불러오기 실패");
      
      return new ApiSuccess(data);

    }
    catch(err) {
      throw new ApiError(err, "상세정보 불러오기 에러")
    }
  }

  @Get("popular")
  async ExhibitionPopular() {
    try {
      const data = await this.exhibitionService.ExhibitionPopular();
      
      return new ApiSuccess(data);
    }
    catch(err) {
      return new ApiError(null, "인기 있는 전시 불러오기 api 에러")
    }
  }
}
