// // src/notification/notification.module.ts
// import { Module } from '@nestjs/common';
// import { NotificationService } from './notification.service';
// import { NotificationController } from './notification.controller';
// import { MongooseModule } from '@nestjs/mongoose';
// import { Notification, NotificationSchema } from './schemas/notification.schema';

// @Module({
//   imports: [
//     MongooseModule.forFeature([
//       { name: Notification.name, schema: NotificationSchema },
//     ]),
//   ],
//   controllers: [NotificationController],
//   providers: [NotificationService],
// })
// export class NotificationModule {}

// src/prisma.service.ts
import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService, PrismaService],
})
export class NotificationModule {} // <- Quan trọng phải export class này
