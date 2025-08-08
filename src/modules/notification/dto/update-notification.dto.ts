import { PartialType } from '@nestjs/mapped-types';
import { CreateNotificationDto } from './create-notification.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateNotificationDto extends PartialType(CreateNotificationDto) {
  @ApiPropertyOptional({
    example: 'newname@example.com',
    description: 'New email address (if changing)',
  })
  email?: string;

  @ApiPropertyOptional({
    example: 'Jane Doe',
    description: 'New name (if changing)',
  })
  name?: string;
}
