import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TokenMiddleware } from '@/shared/middleware/token.middleware';
import { AuthMiddleware } from '@/shared/middleware/auth.middleware';
import { AuthService } from '@/auth/auth.service';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { ReviewSchema } from './schema/review.schema';
import { UsersSchema } from '@/users/schema/user.schema';

@Module({
  imports : [
    MongooseModule.forFeature([
      {
        name : ReviewSchema.name,
        schema : SchemaFactory.createForClass(ReviewSchema)
      },
      {
        name : UsersSchema.name,
        schema : SchemaFactory.createForClass(UsersSchema)
      }
    ])
  ],
  controllers: [ReviewController],
  providers: [ReviewService, AuthService],
})

export class ReviewModule implements NestModule {
  configure(consumer : MiddlewareConsumer) {
    consumer
      .apply(TokenMiddleware)
      .forRoutes({ path: 'review/:seq', method: RequestMethod.GET });

    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'review/:seq', method: RequestMethod.GET })
      .forRoutes(ReviewController);
  }
}
