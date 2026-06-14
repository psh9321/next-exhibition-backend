import {
  Injectable,
  NestMiddleware,
} from '@nestjs/common';

import { NextFunction, Request, Response } from 'express';

import { AuthService } from '../../auth/auth.service';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  use(req: Request, res: Response, next: NextFunction) {
    
    try {
      const token = this.authService.GetHeaderToken(req);

      if (!token["a-t"] && !token["r-t"]) return next();

      const accessPayload = this.authService.VerifyToken(token["a-t"], process.env.ACCESS_KEY);

      if (accessPayload?.userId) {
        req._id = accessPayload.userId;
        return next();
      }

      const refreshPayload = this.authService.VerifyToken(token["r-t"], process.env.REFRESH_KEY);

      if (!refreshPayload?.userId) return next();

      res.setHeader('a-t', this.authService.CreateToken('accessToken', refreshPayload.userId));
      res.setHeader('r-t', token["r-t"] as string);

      req._id = refreshPayload.userId;
      next();
    }
    catch(err) {
      return this.authService.UnauthorizedException(res, 'token middleware 알수없는 에러', err);
    }
  }
}
