import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';

import { UsersController } from './users.controller';
import { UsersSchema } from './schema/user.schema';

import { UsersService } from './users.service';
import { AuthService } from '@/auth/auth.service';
import { FavoriteExhibitionSchema } from '@/favorite/schema/favorite.schema';
import { ReviewSchema } from '@/review/schema/review.schema';
import { AuthMiddleware } from '@/shared/middleware/auth.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UsersSchema.name,
        schema: SchemaFactory.createForClass(UsersSchema),
      },
      {
        name : FavoriteExhibitionSchema.name,
        schema : SchemaFactory.createForClass(FavoriteExhibitionSchema)
      },
      {
        name : ReviewSchema.name,
        schema : SchemaFactory.createForClass(ReviewSchema)
      }
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthMiddleware)
    .exclude(
      { path : "users", method : RequestMethod.POST }
    )
    .forRoutes(UsersController)
  }
}
