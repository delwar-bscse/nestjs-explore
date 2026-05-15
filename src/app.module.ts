import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './common/middlewares/logger/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import { EvService } from './common/config/ev/ev.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UserModule, ConfigModule.forRoot({ isGlobal: true }), MongooseModule.forRoot(process.env.DB_URI!)],
  controllers: [AppController],
  providers: [AppService, EvService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
