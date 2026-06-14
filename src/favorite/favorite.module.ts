import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';

import { FavoriteCultureInfoSchema } from '../favorite/schema/favorite.schema';
import { AuthMiddleware } from '../shared/middleware/auth.middleware';

import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { AuthService } from '@/auth/auth.service';

@Module({
  imports : [
    MongooseModule.forFeature([
      {
        name : FavoriteCultureInfoSchema.name,
        schema : SchemaFactory.createForClass(FavoriteCultureInfoSchema)
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
