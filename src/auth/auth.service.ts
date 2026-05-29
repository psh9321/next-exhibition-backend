import { Injectable } from "@nestjs/common";
import { Request, Response } from 'express';

import jwt, { type SignOptions } from 'jsonwebtoken';

import { DataDecrypt, DataEncrypt } from "@/shared/util/crpyto";
import { UnauthorizedException } from "@/shared/api/response";

@Injectable()
export class AuthService {
    constructor() {}

    /** jwt 토큰 생성 */
    CreateToken(type : "accessToken" | "refreshToken", userId : string) {
        try {
            const options = {
                expiresIn : process["env"][type === "accessToken" ? "ACCESS_TIME" : "REFRESH_TIME"] as SignOptions["expiresIn"],
                issuer : process["env"]["ADMIN_ISSUER"] as string      
            }

            const result = jwt.sign({ userId }, process["env"][type === "accessToken" ? "ACCESS_KEY" : "REFRESH_KEY"] as string, options);

            return DataEncrypt(result);
        }
        catch(err) {
            console.log("create token error",err)
            throw null
        }
    }

    /** 토큰 유효성 검사 */
    VerifyToken(token?: string, secret?: string): USER_TOKNE_PAYLOAD | null {
        try {

            if (!token || !secret) return null;

            const decryptedToken = DataDecrypt(token);

            if (!decryptedToken) {
                return null;
            }

            return jwt.verify(decryptedToken, secret) as USER_TOKNE_PAYLOAD;
        } 
        catch {
            return null;
        }
    }

    /** 배열로 올수도 있어서 예외처리 */
    GetParserTokenValue(token?: string | string[]) : string | undefined {
        const tokenValue = Array.isArray(token) ? token[0] : token;

        if(!tokenValue) return undefined;

        const trimmedToken = tokenValue.trim().replace(/^Bearer\s+/i, '');
        const unquotedToken = trimmedToken.replace(/^["']|["']$/g, '');

        try {
            return decodeURIComponent(unquotedToken).replace(/\s/g, '+');
        }
        catch {
            return unquotedToken.replace(/\s/g, '+');
        }
    }

    /** 미들웨어가 아닌 비로그인 상태에서도 토큰을 받을때 유효성 검사 */
    HeaderTokenVerify(accessToken? : string | string[], refreshToken? : string | string[]) {

        if(!accessToken || !refreshToken) return

        const accessPayload = this.VerifyToken(this.GetParserTokenValue(accessToken), process.env.ACCESS_KEY);

        if(accessPayload?.userId) return { userId : accessPayload.userId };

        const refreshPayload = this.VerifyToken(this.GetParserTokenValue(refreshToken), process.env.REFRESH_KEY);

        if(!refreshPayload?.userId) return { userId : undefined }

        return {

            userId : refreshPayload.userId,
            token : {
                accessToken : this.CreateToken('accessToken', refreshPayload.userId),
                refreshToken : this.CreateToken('refreshToken', refreshPayload.userId)
            }
        }
    }

    /** 리퀘스트에서 토큰 가져오기 */
    GetHeaderToken(req: Request) : AUTH_HEADER_TOKEN {
        return {
            "a-t" : this.GetParserTokenValue(req.headers["a-t"]),
            "r-t" : this.GetParserTokenValue(req.headers['r-t']),
        }
    }

    /** 토큰 검사 실패시 */
    UnauthorizedException(res: Response, msg : string, errOptions? : Error) {
        return res.status(200).json(new UnauthorizedException(errOptions, msg));
    }
}
