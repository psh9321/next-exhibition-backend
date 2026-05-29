import { Controller, Post, Body, Res, Delete, Param, Req, Patch, UploadedFile, UseInterceptors } from '@nestjs/common';
import type { Response, Request } from 'express';

import { UsersDto, UserUpdateDto } from './dto/users.dto';

import { UsersService } from './users.service';
import { AuthService } from '@/auth/auth.service';

import { ApiError, ApiFail, ApiSuccess } from '@/shared/api/response';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async UserSignUpOrSignIn(
    @Body() param: UsersDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const userInfo = await this.usersService.SignUpOrSignIn(param);

      if (!userInfo) return new ApiFail(userInfo, '회원가입 및 로그인 실패');
      
      const a = this.authService.CreateToken('accessToken', userInfo.id);
      const r = this.authService.CreateToken('refreshToken', userInfo.id);

      res.setHeader("a-t", a);
      res.setHeader("r-t", r);

      return new ApiSuccess(userInfo);
    } 
    catch (err) {
      return new ApiError(err, '간편 회원가입 및 로그인 에러');
    }
  }

  @Delete()
  async UserDelete(
    @Req() req : Request
  ) {
    try {
      
      const isDelete = await this.usersService.UserDelete(req._id as string);

      if (!isDelete) return new ApiFail(null, '회원탈퇴 실패');

      return new ApiSuccess('회원탈퇴 완료');
    } 
    catch (err) {
      throw new ApiError(err, '회원탈퇴 에러');
    }
  }

  @Patch()
  async UserUpdate(
    @Req() req : Request,
    @Body() body : UserUpdateDto
  ) {
    try {

      const result = await this.usersService.UserUpdate(req._id as string, body);

      if(!result) return new ApiFail(null, "유저 정보수정 실패");

      return new ApiSuccess(result);
    }
    catch(err) {
      throw new ApiError(err, '유저정보 수정 에러');
    }
  }

  @Post("profile")
  @UseInterceptors(FileInterceptor("item", {
    limits : {
      fileSize : 10 * 1024 * 1024
    }
  }))
  async UserProfile(
    @Req() req : Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const result = await this.usersService.UserProfile(req._id as string, file);

      return new ApiSuccess(result);
    }
    catch(err) {
      return new ApiError(err, "프로필 이미지 업로드 에러");
    }

  }
}
