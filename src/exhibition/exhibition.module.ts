import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ExhibitionService } from './exhibition.service';
import { ExhibitionController } from './exhibition.controller';
import { FavoriteExhibitionSchema } from '../favorite/schema/favorite.schema';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { AuthService } from '@/auth/auth.service';
import { TokenMiddleware } from '@/shared/middleware/token.middleware';

@Module({
  imports : [
    MongooseModule.forFeature([
      {
        name : FavoriteExhibitionSchema.name,
        schema : SchemaFactory.createForClass(FavoriteExhibitionSchema)
      }
    ])
  ],
  controllers: [ExhibitionController],
  providers: [ExhibitionService, AuthService],
  exports: [ExhibitionService],
})
export class ExhibitionModule implements NestModule {
  configure(consumer : MiddlewareConsumer) {
    consumer 
    .apply(TokenMiddleware)
    .forRoutes(ExhibitionController)
  }
}
