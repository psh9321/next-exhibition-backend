import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';

import { FavoriteExhibitionSchema } from '../favorite/schema/favorite.schema';
import { AuthMiddleware } from '../shared/middleware/auth.middleware';

import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { AuthService } from '@/auth/auth.service';

@Module({
  imports : [
    MongooseModule.forFeature([
      {
        name : FavoriteExhibitionSchema.name,
        schema : SchemaFactory.createForClass(FavoriteExhibitionSchema)
      }
    ])
  ],
  controllers: [FavoriteController],
  providers: [FavoriteService, AuthService],
})
export class FavoriteModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(FavoriteController);
  }
}
