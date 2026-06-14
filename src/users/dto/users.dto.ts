import { IsEnum, IsNotEmpty } from "class-validator";
import { USER_SOCIAL_TYPE_ENUM } from "../types/user.enum";

export class UsersDto {
    @IsNotEmpty({message : "userName 값이 누락 됐습니다."})
    userName : string;

    @IsNotEmpty({message : "userId 값이 누락 됐습니다."})
    userId : string;

    @IsNotEmpty({message : "socialType 값이 누락 됐습니다."})
    @IsEnum(USER_SOCIAL_TYPE_ENUM, { message : "socialType 값이 올바르지 않습니다." })
    socialType : USER_SOCIAL_TYPE;

    @IsNotEmpty({message : "profileImg 값이 누락 됐습니다."})
    profileImg : string
}

export class UserUpdateDto {
    @IsNotEmpty({message : "userName 값이 누락 됐습니다."})
    updateName : string;

    @IsNotEmpty({message : "isProfileImg 값이 누락 됐습니다."})
    updateIsProfileImg : boolean
}