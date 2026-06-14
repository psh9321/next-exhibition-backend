import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { FavoriteCultureInfoSchema } from './schema/favorite.schema';
import { FavoriteListQueryDto } from './dto/favorite.list.dto';
import { FavoriteToggleDto } from './dto/favorite.toggle.dto';


@Injectable()
export class FavoriteService {
  constructor(
    @InjectModel(FavoriteCultureInfoSchema.name)
    private readonly favoriteModel : Model<FAVORITE_EXHIBITION_MODEL>,
  ) {}

  async GetMyFavoriteExhibitionList(favoriterId : string) {
    try {

      const searchParams = { 
        favoriterId,
      }

      const favorites = await this.favoriteModel.find(searchParams).sort({createdAt : -1});

      return favorites

    }
    catch(err) {
      throw err
    }
  }

  async ToggleFavoriteExhibition(favoriterId : string,param : FavoriteToggleDto) {
    try {

      const { imgUrl, title, seq, startDate, endDate, area } = param;

      const favoriteParams = {
        favoriterId,
        exhibitionImg : imgUrl,
        exhibitionTitle : title,
        exhibitionSeq : seq,
        exhibitionStartDate : startDate,
        exhibitionEndDate : endDate,
        exhibitionArea : area
      }

      const favoriteInfo = await this.favoriteModel.findOne(favoriteParams);

      if(favoriteInfo) {
        const deleteStatus = await this.favoriteModel.deleteOne({
          _id : favoriteInfo._id.toString(),
          favoriterId
        });

        const isSuccess = deleteStatus.deletedCount === 1;

        return {
          toggleStatus : false,
          msg : `찜하기 해제 ${isSuccess ? "성공" : "실패"}`,
        }
      }
      else {

        await this.favoriteModel.create(favoriteParams);

        return {
          toggleStatus : true,
          msg : "찜하기 성공"
        }
      }
    }
    catch(err) {
      throw err
    }
  }
}
