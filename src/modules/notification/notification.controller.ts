import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiNotFoundResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  @ApiOperation({ summary: 'Subscribe with an email' })
  @ApiResponse({ status: 201, description: 'Email subscribed successfully' })
  @ApiConflictResponse({ description: 'Email already subscribed' })
  create(@Body() dto: CreateNotificationDto) {
    return this.notificationService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all subscribed emails' })
  @ApiResponse({ status: 200, description: 'List of subscribed emails' })
  findAll() {
    return this.notificationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single subscribed email by ID' })
  @ApiParam({ name: 'id', description: 'MongoDB ObjectId of the email' })
  @ApiResponse({ status: 200, description: 'Notification found' })
  @ApiNotFoundResponse({ description: 'Notification not found' })
  findOne(@Param('id') id: string) {
    return this.notificationService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a subscribed email' })
  @ApiParam({ name: 'id', description: 'MongoDB ObjectId of the email' })
  @ApiResponse({ status: 200, description: 'Notification updated' })
  @ApiNotFoundResponse({ description: 'Notification not found' })
  update(@Param('id') id: string, @Body() dto: UpdateNotificationDto) {
    return this.notificationService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a subscribed email' })
  @ApiParam({ name: 'id', description: 'MongoDB ObjectId of the email' })
  @ApiResponse({ status: 200, description: 'Notification deleted' })
  @ApiNotFoundResponse({ description: 'Notification not found' })
  remove(@Param('id') id: string) {
    return this.notificationService.remove(id);
  }
}
