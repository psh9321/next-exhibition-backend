import { Controller, Get, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import dotenv from 'dotenv';
import { ExhibitionModule } from './culture/culture.module';
import { UsersModule } from './users/users.module';
import { FavoriteModule } from './favorite/favorite.module';
import { ReviewModule } from './review/review.module';

dotenv.config();

@Controller()
class HealthCheckController {
  @Get('/health')
  HealthCheck(): string {
    return 'health check!!';
  }
}

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_DB_URL as string),
    ExhibitionModule,
    UsersModule,
    FavoriteModule,
    ReviewModule,
  ],
  controllers: [HealthCheckController],
})
export class AppModule {}
