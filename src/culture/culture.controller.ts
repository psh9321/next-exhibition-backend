import { Controller, Get, Param, Delete, Query, Req } from '@nestjs/common';

import type { Request } from 'express';

import { CultureService } from './culture.service';
import { CultureInfoListQueryDto } from './dto/culture.info.list.dto';
import { ApiError, ApiFail, ApiSuccess } from '@/shared/api/response';
import { CultureInfoDetailDto } from './dto/culture.info.detail.info.dto';
import { AuthService } from '@/auth/auth.service';
import { CultureInfoListMapDto } from './dto/culture.info.list.map.dto';

@Controller('culture')
export class CultureController {
  constructor(
    private readonly cultureService: CultureService,
    private readonly authService: AuthService,
  ) {}

  @Get("list")
  async GetCultureInfoList(
    @Query() query : CultureInfoListQueryDto,
  ) {

    try {

      const data = await this.cultureService.GetCultureInfoList(query);

      if(!data) return new ApiFail(data, "전시정보 불러오기 실패");
      
      return new ApiSuccess(data);
    }
    catch(err) {
      throw new ApiError(err, "전시정보 불러오기 에러")
    }
  }

  @Get('detail')
  GetCultureInfoDetailError() {
    return new ApiError(null, "전시 req 값이 누락됐습니다.")
  }

  @Get('detail/:seq')
  async GetCultureInfoDetail(
    @Param() param: CultureInfoDetailDto,
    @Req() req: Request
  ) {
    try {
      
      const data = await this.cultureService.GetCultureInfoDetail(param["seq"], req._id);

      if(!data) return new ApiFail(data, "전시 상세정보 불러오기 실패");
      
      return new ApiSuccess(data);

    }
    catch(err) {
      throw new ApiError(err, "상세정보 불러오기 에러")
    }
  }

  @Get("popular")
  async CultureInfoPopular() {
    try {
      const data = await this.cultureService.CultureInfoPopular();
      
      return new ApiSuccess(data);
    }
    catch(err) {
      return new ApiError(null, "인기 있는 전시 불러오기 api 에러")
    }
  }

  @Get("map")
  async CultureInfoListMap(
    @Query() query : CultureInfoListMapDto
  ) {
    try {
      const data = await this.cultureService.CultureInfoListMap(query);

      return new ApiSuccess(data);
    }
    catch(err) {
      return new ApiError(null, "문화 정보 지도 형식 리스트 불러오기 api 에러")
    }
  }
}
