import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  /**
   * Tạo mới user hoặc cập nhật lịch hẹn nếu đã tồn tại.
   * - Nếu user chưa có → tạo mới
   * - Nếu user đã có và có appointmentDate → cập nhật
   * - Nếu user đã có và không có appointmentDate → báo lỗi
   */
  async create(createUserDto: CreateUserDto) {
    const { email, phone, appointmentDate } = createUserDto;

    const existingUser = await this.prisma.users.findFirst({
      where: {
        OR: [
          { email: email },
          { phone: phone || undefined }, // undefined để tránh tìm phone = null
        ],
      },
    });

    if (existingUser) {
      if (appointmentDate) {
        return this.prisma.users.update({
          where: { id: existingUser.id },
          data: {
            appointmentDate: new Date(appointmentDate),
          },
        });
      }
      throw new BadRequestException(
        'User already exists and no appointment was provided',
      );
    }

    return this.prisma.users.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        phone: createUserDto.phone,
        address: createUserDto.address,
        appointmentDate: appointmentDate ? new Date(appointmentDate) : null,
      },
    });
  }

  async findAll() {
    return this.prisma.users.findMany();
  }

  async findOne(id: string) {
    const user = await this.prisma.users.findUnique({
      where: { id },
    });
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      return await this.prisma.users.update({
        where: { id },
        data: updateUserDto,
      });
    } catch (err) {
      throw new NotFoundException(`User #${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.users.delete({
        where: { id },
      });
    } catch (err) {
      throw new NotFoundException(`User #${id} not found`);
    }
  }
}
