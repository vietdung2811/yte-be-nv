import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Notification,
  NotificationDocument,
} from './schemas/notification.schema';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<NotificationDocument>,
  ) {}

  async create(dto: CreateNotificationDto) {
    const exists = await this.notificationModel.findOne({ email: dto.email });
    if (exists) {
      throw new ConflictException('Email already subscribed');
    }
    return this.notificationModel.create(dto);
  }

  async findAll() {
    return this.notificationModel.find().exec();
  }

  async findOne(id: string) {
    const found = await this.notificationModel.findById(id);
    if (!found) throw new NotFoundException('Notification not found');
    return found;
  }

  async update(id: string, dto: UpdateNotificationDto) {
    const updated = await this.notificationModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updated) throw new NotFoundException('Notification not found');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.notificationModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Notification not found');
    return { message: 'Deleted successfully' };
  }
}
