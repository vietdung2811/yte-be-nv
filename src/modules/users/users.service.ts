import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  /**
   * Tạo mới user hoặc cập nhật lịch hẹn nếu đã tồn tại.
   * Logic:
   * - Nếu user chưa có → tạo mới
   * - Nếu user đã có và có appointmentDate → cập nhật
   * - Nếu user đã có và không có appointmentDate → báo lỗi
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, phone, appointmentDate } = createUserDto;

    const existingUser = await this.userModel.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      if (appointmentDate) {
        existingUser.appointmentDate = new Date(appointmentDate);
        return existingUser.save();
      }
      throw new BadRequestException(
        'User already exists and no appointment was provided',
      );
    }

    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    if (!updatedUser) throw new NotFoundException(`User #${id} not found`);
    return updatedUser;
  }

  async remove(id: string): Promise<void> {
    const res = await this.userModel.findByIdAndDelete(id).exec();
    if (!res) throw new NotFoundException(`User #${id} not found`);
  }
}
