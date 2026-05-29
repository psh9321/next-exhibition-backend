import { HydratedDocument } from 'mongoose';
import { UsersSchema } from '../schema/user.schema';

declare global {

    /** 소셜 로그인 타입 */
    type USER_SOCIAL_TYPE = "naver" | "google" | "kakao"

    type USER_MODEL = HydratedDocument<UsersSchema>
}

export {}