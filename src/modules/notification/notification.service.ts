import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateNotificationDto) {
    const exists = await this.prisma.notification.findUnique({
      where: { email: dto.email },
    });
    if (exists) {
      throw new ConflictException('Email already subscribed');
    }
    return this.prisma.notification.create({
      data: {
        email: dto.email,
      },
    });
  }

  async findAll() {
    return this.prisma.notification.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const found = await this.prisma.notification.findUnique({
      where: { id },
    });
    if (!found) throw new NotFoundException('Notification not found');
    return found;
  }

  async update(id: string, dto: UpdateNotificationDto) {
    try {
      return await this.prisma.notification.update({
        where: { id },
        data: {
          email: dto.email,
        },
      });
    } catch {
      throw new NotFoundException('Notification not found');
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.notification.delete({
        where: { id },
      });
      return { message: 'Deleted successfully' };
    } catch {
      throw new NotFoundException('Notification not found');
    }
  }
}
