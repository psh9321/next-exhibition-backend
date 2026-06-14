import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CultureService } from './culture.service';
import { CultureController } from './culture.controller';
import { FavoriteCultureInfoSchema } from '../favorite/schema/favorite.schema';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { AuthService } from '@/auth/auth.service';
import { TokenMiddleware } from '@/shared/middleware/token.middleware';

@Module({
  imports : [
    MongooseModule.forFeature([
      {
        name : FavoriteCultureInfoSchema.name,
        schema : SchemaFactory.createForClass(FavoriteCultureInfoSchema)
      }
    ])
  ],
  controllers: [CultureController],
  providers: [CultureService, AuthService],
  exports: [CultureService],
})
export class ExhibitionModule implements NestModule {
  configure(consumer : MiddlewareConsumer) {
    consumer 
    .apply(TokenMiddleware)
    .forRoutes(CultureController)
  }
}
