import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostCommentModule } from './modules/post.comment/post.comment.module';
import { PostModule } from './modules/post/post.module';
import { PostCategoryModule } from './modules/post.category/post.category.module';
import { NotificationModule } from './modules/notification/notification.module';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    NotificationModule,
    PostModule,
    PostCommentModule,
    PostCategoryModule,
    UserModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        dbName: 'xepo'
      }),
      inject: [ConfigService],
    }),
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
