import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UsersSchema } from './schema/user.schema';
import { Model } from 'mongoose';
import { UsersDto, UserUpdateDto } from './dto/users.dto';
import { FavoriteExhibitionSchema } from '@/favorite/schema/favorite.schema';

import { ReviewSchema } from '@/review/schema/review.schema';

import fs from "fs"
import path from 'path';
import sharp from 'sharp';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(UsersSchema.name)
    private readonly userModel : Model<USER_MODEL>,

    @InjectModel(FavoriteExhibitionSchema.name)
    private readonly favoriteModel : Model<FAVORITE_EXHIBITION_MODEL>,

    @InjectModel(ReviewSchema.name)
    private readonly reviewModel : Model<REVIEW_MODEL>,
  ) {}

  async SignUpOrSignIn(param : UsersDto) {

    try {

      const userInfo =  await this.userModel.findOne({
        id : param.userId,
        type : param.socialType        
      });
      
      const result = {
        createdAt : "",
        id : ""
      }

      if(userInfo) {
        result["createdAt"] = userInfo?.get("createdAt");
        result["id"] = userInfo?._id.toString();
        result["isProfileImg"] = userInfo?.isProfileImg;
        result["name"] = userInfo?.name;
        
        return result;
      }
      else {
        const newUser = await this.userModel.create({
          id : param.userId,
          name : param.userName,
          type : param.socialType
        });

        const newUser_id = newUser._id.toString();

        const rootDirectory = path.join(__dirname, "../../", process.env.FILE_DIRECTORY_NAME as string);
    
        fs.mkdirSync(path.join(rootDirectory, newUser_id), {
          recursive : true
        });

        result["id"] = newUser_id;
        result["createdAt"] = newUser.get("createdAt");
        result["isProfileImg"] = newUser?.isProfileImg;
        result["name"] = newUser?.name;

        return result
      }
    }
    catch(err) {
      throw err
    }
  }

  async UserDelete(_id : string) {
    try {

      const result = await this.userModel.findOneAndDelete({ _id });

      if(!result) return false;

      await Promise.all([
        this.favoriteModel.deleteMany({ favoriterId : _id }),
        this.reviewModel.deleteMany({ writerId : _id }),
      ]);

      const rootDirectory = path.join(__dirname, "../../", process.env.FILE_DIRECTORY_NAME as string);

      const resultPath = path.join(rootDirectory, _id);

      /** 폴더 삭제 */
      if(fs.existsSync(resultPath)) fs.rmSync(resultPath, {recursive : true, force : true});

      return true
    }
    catch(err) {
      throw err
    }
  }

  async UserUpdate(_id : string, data : UserUpdateDto) {
    try {
      const result = await this.userModel.findByIdAndUpdate(_id, { 
        $set : {
          name : data.updateName,
          isProfileImg : data.updateIsProfileImg
        }
      });

      if(!result) return null;

      if(!data.updateIsProfileImg) {
        const rootDirectory = path.join(__dirname, "../../", process.env.FILE_DIRECTORY_NAME as string);

        const resultPath = path.join(rootDirectory, _id);

        const profileFilePath = path.join(resultPath, "profile.jpeg");

        if(fs.existsSync(profileFilePath)) fs.rmSync(profileFilePath, { force : true });
      }

      return {
        updateInfo : {
          name : data.updateName,
          isProfileImg : data.updateIsProfileImg
        },
        msg : "유저정보 수정 성공"
      }
    }
    catch(err) {
      throw err
    }
  }

  async UserProfile(_id : string, file : Express.Multer.File) {
    try {
      if(!file) throw new BadRequestException("프로필 이미지가 누락됐습니다.");

      const rootDirectory = path.join(__dirname, "../../", process.env.FILE_DIRECTORY_NAME as string);

      const resultPath = path.join(rootDirectory, _id);

      fs.mkdirSync(resultPath, { recursive : true });

      fs.readdirSync(resultPath).forEach((fileName) => {
        fs.rmSync(path.join(resultPath, fileName), { recursive : true, force : true });
      });
      
      const profileFileName = "profile.jpeg";
      const profileFilePath = path.join(resultPath, profileFileName);

      // if(file.mimetype === "image/jpeg" || file.mimetype === "image/jpg")
      await sharp(file.buffer)
        .rotate()
        .flatten({ background : "#ffffff" })
        .jpeg({ quality : 90 })
        .toFile(profileFilePath);

      await this.userModel.findByIdAndUpdate(_id, {
        $set : {
          isProfileImg : true
        }
      });

      return {
        isUpdateStatus : true,
        msg : "프로필 이미지 저장 성공"
      }
    }
    catch(err) {
      throw err
    }
  }
}
