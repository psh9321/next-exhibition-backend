import { Controller, Get, Post, Param, Delete, Query, Req, Body } from '@nestjs/common';
import type { Request } from 'express';
import { FavoriteService } from './favorite.service';
import { FavoriteListQueryDto } from './dto/favorite.list.dto';
import { ApiError, ApiSuccess } from '@/shared/api/response';
import { FavoriteToggleDto } from './dto/favorite.toggle.dto';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  async MyFavoriteExhibitionList(
    @Req() req: Request
  ) {

    try {
      const result = await this.favoriteService.GetMyFavoriteExhibitionList(req._id as string);

      return new ApiSuccess(result);
    }
    catch(err) {
      return new ApiError(err, "좋아요 리스트 불러오기 에러")
    }
  }

  @Post()
  async AddFavoriteExhibition(
    @Body() param : FavoriteToggleDto,
    @Req() req: Request
  ) {

    try {
      const result = await this.favoriteService.ToggleFavoriteExhibition(req._id as string, param);

      return new ApiSuccess(result);
    }
    catch(err) {
      return new ApiError(err, "전시 좋아요 토긇 api 에러");
    }
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Req() req: Request
  ) {
    console.log(req._id, id);
    return ""
  }
}
