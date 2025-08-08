import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Nguyễn Văn A',
    description: 'Tên đầy đủ của người dùng',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'nguyenvana@example.com',
    description: 'Địa chỉ email hợp lệ',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '0987654321',
    description: 'Số điện thoại liên hệ',
  })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({
    example: '123 Lê Lợi, Quận 1, TP.HCM',
    description: 'Địa chỉ liên lạc',
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiPropertyOptional({
    example: '2025-08-15T10:00:00.000Z',
    description: 'Ngày giờ hẹn (ISO 8601), tùy chọn',
  })
  @IsOptional()
  @IsDateString()
  appointmentDate?: string;
}
