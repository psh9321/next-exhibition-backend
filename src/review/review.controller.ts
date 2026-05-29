import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';

import type { Request } from 'express';

import { ReviewService } from './review.service';
import { ReviewListParamDto, ReviewListQueryDto } from './dto/review.list.dto';
import { ReviewAddDto, ReviewUpdateDto } from './dto/review.item.dto';
import { ApiError, ApiFail, ApiSuccess, UnauthorizedException } from '@/shared/api/response';

@Controller('review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
  ) {}

  @Get() 
  ReviewListError() {
      return new ApiError(null, "전시 req 값이 누락됐습니다.")
  }
  
  @Get(":seq")
  async ReviewList(
      @Query() query : ReviewListQueryDto,
      @Param() param : ReviewListParamDto,
      @Req() req : Request
  ) {
    try {

      const result = await this.reviewService.ReviewList(req._id as string, param["seq"], query);
      
      return new ApiSuccess(result);
    }
    catch(err) {
      return new ApiError(err, "리뷰 불러오기 api 에러");
    }
  }

  @Post()
  async AddReview(
    @Body() data : ReviewAddDto,
    @Req() req : Request
  ) {
    try {

      const result = await this.reviewService.AddReview(req._id as string ,data);
      
      return new ApiSuccess(result);
    }
    catch(err) {
      return new ApiError(err, "리뷰 등록 api 에러");
    }
  }

  @Patch("")
  async UpdateRieviewError() {
    return new ApiError(null, "itemId 값이 누락됐습니다.")
  }

  @Patch(":itemId")
  async UpdateReview(
    @Body() data : ReviewUpdateDto,
    @Param() param : { itemId : string },
  ) {
    try {

      const result = await this.reviewService.UpdateReview(param["itemId"], data["reviewContents"]);

      if(!result) return new ApiFail(data, "리뷰 수정 실패");

      return new ApiSuccess(result);
    }
    catch(err) {
      return new ApiError(err, "리뷰 수정 api 에러")
    }
  }

  @Delete()
  async DeleteReviewError(){
    return new ApiError(null, "itemId 값이 누락됐습니다.")
  }

  @Delete(":itemId")
  async DeleteReview(
    @Param() query : { itemId : string },
    @Req() req : Request
  ){
    try {
      const result = await this.reviewService.DeleteReview(query.itemId, req._id as string);

      if(!result) return new ApiFail(null, "리뷰 삭제 실패");

      return new ApiSuccess(result);
    }
    catch(err) {
      return new ApiError(err, "리뷰 삭제 api 에러")
    }
  }
  
}
