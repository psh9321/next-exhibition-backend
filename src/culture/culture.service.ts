import { Injectable } from '@nestjs/common';
// import { CreateExhibitionDto } from './dto/create-exhibition.dto';
// import { UpdateExhibitionDto } from './dto/update-exhibition.dto';

import { KAKAO_API, OPEN_API } from 'src/shared/api/instance';
import { CultureInfoListQueryDto } from './dto/culture.info.list.dto';

import { XmlToJson } from '@/culture/util/xmlToJson';
import { InjectModel } from '@nestjs/mongoose';
import { FavoriteCultureInfoSchema } from '../favorite/schema/favorite.schema';
import { Model } from 'mongoose';
import { CultureInfoListMapDto } from './dto/culture.info.list.map.dto';

@Injectable()
export class CultureService {
  constructor(
    @InjectModel(FavoriteCultureInfoSchema.name)
    private readonly favoriteModel : Model<FAVORITE_EXHIBITION_MODEL>
  ){}

  async GetCultureInfoList(query : CultureInfoListQueryDto) {
    try {

      const { keyword, area, offset, limit, type } = query;
      
      const searchParams = {
        PageNo : offset,
        numOfrows : limit,
        serviceTp : type,
        // from : "20180515",
        // to : "20260515"
      }

      if(keyword) searchParams["keyword"] = keyword;
      if(area) searchParams["sido"] = area;

      const xmlStr = await OPEN_API("realm2", {
        searchParams
      }).text();

      const jsonData = XmlToJson(xmlStr);

      const { OpenAPI_ServiceResponse, response } = jsonData;

      if(OpenAPI_ServiceResponse) return null;

      if(!response) return null;

      const openApiData = jsonData["response"]["body"] as OPEN_API_SERVER_RESPONSE_DATA;

      const { totalCount } = openApiData;

      const total = Number(totalCount??0);

      const isNextPage = offset < Math.floor(total/query.limit);

      const result = {
          total,
          isNextPage,
          page : offset,
          limit : limit,
          list : Array.isArray(openApiData["items"]["item"]) ? openApiData["items"]["item"] : []
      } as INFINITY_RESPONSE_ITEM<EXHIBITION_ITEM[]>;

      return result
    }
    catch(err) {
      throw err
    }
  }

  async GetCultureInfoDetail(seq : string, favoriterId?: string) {
    try {
        const xmlStr = await OPEN_API("detail2", {
            searchParams : { seq }   
        }).text();

        const jsonData = XmlToJson(xmlStr);
    
        const { OpenAPI_ServiceResponse, response } = jsonData;

        if(OpenAPI_ServiceResponse) return null;
        if(!response) return null;

        const result = {
          ...jsonData["response"]["body"]["items"]["item"] as EXHIBITION_DETAIL_ITEM,
          isFavorite : false
        }

        if(favoriterId) {
          const favoriteInfo = await this.favoriteModel.findOne({ 
            favoriterId,
            exhibitionSeq: seq
          });

          result["isFavorite"] = favoriteInfo ? true : false
        }

        return result
    }
    catch(err) {
      throw err
    }
  }

  async CultureInfoPopular() {
    try {
      const popularExhibitions = await this.favoriteModel.aggregate([
        {
          $group : {
            _id : "$exhibitionSeq",
            favoriteCount : { $sum : 1 },
            exhibitionSeq : { $first : "$exhibitionSeq" },
            exhibitionImg : { $first : "$exhibitionImg" },
            exhibitionTitle : { $first : "$exhibitionTitle" },
            exhibitionStartDate : { $first : "$exhibitionStartDate" },
            exhibitionEndDate : { $first : "$exhibitionEndDate" },
            exhibitionArea : { $first : "$exhibitionArea" },
          }
        },
        {
          $sort : {
            favoriteCount : -1
          }
        },
        {
          $limit : 3
        },
        {
          $project : {
            _id : 0,
            exhibitionSeq : 1,
            exhibitionImg : 1,
            exhibitionTitle : 1,
            exhibitionStartDate : 1,
            exhibitionEndDate : 1,
            exhibitionArea : 1,
            favoriteCount : 1
          }
        }
      ]);

      return popularExhibitions;
    }
    catch(err) {
      throw err
    }
  }


  async CultureInfoListMap(query : CultureInfoListMapDto) {
    try { 

      const { offset, limit, gpsxfrom, gpsyfrom, gpsxto, gpsyto } = query;

      // const [ addressInfo, xmlStr ] = await Promise.all([
      //   KAKAO_API("geo/coord2address.json", {
      //     searchParams : {
      //       x : gpsxfrom,
      //       y : gpsyfrom
      //     }
      //   }).json<API_SERVER_ADDRESS>(),
      //   OPEN_API("area2", {
      //     searchParams : { 
      //       gpsxfrom, gpsyfrom, gpsxto, gpsyto,
      //       PageNo : offset,
      //       numOfrows : limit,
      //     },
      //   })
      //   .text()
      // ])

      const xmlStr = await OPEN_API("area2", {
          searchParams : { 
            gpsxfrom, gpsyfrom, gpsxto, gpsyto,
            PageNo : offset,
            numOfrows : limit,
          },
        })
        .text()

      // const { region_1depth_name, region_2depth_name, region_3depth_name } = addressInfo.documents[0].address;

      const jsonData = XmlToJson(xmlStr);
      
      const openApiData = jsonData["response"]["body"] as OPEN_API_SERVER_RESPONSE_DATA;

      const { totalCount } = openApiData;

      const total = Number(totalCount??0);

      const isNextPage = offset < Math.floor(total/query.limit);
      
      const result = {
        // address : `${region_1depth_name} ${region_2depth_name} ${region_3depth_name}`,
        total,
        isNextPage,
        page : offset,
        limit : limit,
        list : Array.isArray(openApiData["items"]["item"]) ? openApiData["items"]["item"] : []
      }

      return result
    }
    catch(err) {
      throw err;
    }
  }
}
