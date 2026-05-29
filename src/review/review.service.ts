import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReviewSchema } from './schema/review.schema';
import { Model } from 'mongoose';
import { ReviewListQueryDto } from './dto/review.list.dto';
import { ReviewAddDto } from './dto/review.item.dto';
import { UsersSchema } from '@/users/schema/user.schema';

@Injectable()
export class ReviewService {
  constructor( 
    @InjectModel(ReviewSchema.name)
    private readonly reviewModel : Model<REVIEW_MODEL>,
    @InjectModel(UsersSchema.name)
    private readonly userModel : Model<USER_MODEL>,
   ) {}
  async ReviewList(writerId : string, seq : string, query : ReviewListQueryDto) {
    try {

      const { offset, limit, my } = query;

      const searchParams = { seq };

      
      if(my === "true") searchParams["writerId"] = writerId;

      const [ total, reviews ] = await Promise.all([
        this.reviewModel.countDocuments(searchParams).exec(),
        this.reviewModel.find(searchParams)
        .sort({createdAt : -1})
        .skip(offset * limit)
        .limit(limit)
        .lean()
      ]);

      const writerIds = reviews.map((review) => review["writerId"]);

      const users = await this.userModel.find({
        _id : { $in : writerIds }
      })
      .select('_id name isProfileImg')
      .lean();

      const userMap = new Map(
        users.map(user => [user._id.toString(), user])
      );

      const isNextPage = offset < Math.floor(total/limit);

      const result = {
        total,
        isNextPage,
        limit,
        page : offset,
        list : reviews.map(review => ({
          ...review,
          writerName : userMap.get(review.writerId)?.name,
          writerIsProfileImg : userMap.get(review.writerId)?.isProfileImg,
        }))
      };

      return result

    }
    catch(err) {
      throw err
    }
  }

  async AddReview(writerId : string, param : ReviewAddDto) {
    try {
      await this.reviewModel.create({
        writerId,
        contents : param["reviewContents"],
        seq : param["exhibitionSeq"],
        
      });

      return {
        exhibitionSeq : param["exhibitionSeq"],
        msg : "리뷰 등록 성공"
      }
    }
    catch(err) {
      throw err
    }
  }

  async UpdateReview(itemId : string, contents : string) {
    try {
      /**
       * matchedCount: 조건에 매칭된 문서 개수
       * modifiedCount: 실제로 값이 변경된 문서 개수
       * acknowledged: MongoDB가 작업을 정상적으로 접수/확인했는지
       * upsertedCount: upsert로 새로 생성된 문서 개수
       * upsertedId: upsert로 생성된 문서의 id
       */
      /** { returnDocument : "after" } 업데이트된 document 를받을시 */
      const updateReview = await this.reviewModel.findOneAndUpdate({ _id : itemId }, { contents }, { returnDocument : "after" });

      if(!updateReview) return null

      return {
        reviewContents : updateReview.contents,
        updateDate : updateReview.updatedAt,
        msg : "리뷰 수정 성공"
      }
    }
    catch(err) {
      throw err
    }
  }

  async DeleteReview(itemId : string, writerId : string) {

    try {
      const deleteReview = await this.reviewModel.findOneAndDelete({_id : itemId, writerId});

      if(!deleteReview) return null

      return {
        deleteContents : deleteReview.contents,
        msg : "리뷰 삭제 성공"
      }
    }
    catch(err) {
      throw err
    }
  }
}
