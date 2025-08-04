// Trường hợp	                                Kết quả expected
// ✅ User chưa tồn tại	                        Tạo mới user
// ✅ User đã tồn tại và có appointment	        Cập nhật lịch
// ❌ User đã tồn tại, không có appointment	    Báo lỗi

import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UserService } from './users.service';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;
  let model: jest.Mocked<Model<User>>;

  const userId = '123456789012';
  const userDto = {
    name: 'Dvd',
    email: 'dvd@email.com',
    phone: '0987654321',
    address: 'Hà Nội',
  };

  const userWithAppointment = {
    ...userDto,
    appointmentDate: new Date('2025-08-02'),
  };

  const mockUser = {
    ...userWithAppointment,
    _id: userId,
    save: jest.fn().mockResolvedValue(userWithAppointment),
  };

  const mockUserModel = {
    findOne: jest.fn(),
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    model = module.get(getModelToken(User.name));
  });

  afterEach(() => jest.clearAllMocks());

  it('✅ should create a new user if not exists', async () => {
    model.findOne.mockResolvedValue(null);
    model.create.mockResolvedValue({ ...userDto, _id: userId } as any);

    const result = await service.create(userDto as any);

    expect(model.create).toHaveBeenCalledWith(userDto);
    expect(result).toEqual(expect.objectContaining(userDto));
  });

  it('✅ should update appointmentDate if user exists and has appointmentDate', async () => {
    const existingUser = {
      _id: userId,
      ...userDto,
      appointmentDate: new Date('2025-08-02'),
      save: jest.fn().mockResolvedValue({
        ...userDto,
        appointmentDate: new Date('2025-08-10'),
      }),
    } as unknown as User;

    model.findOne.mockResolvedValue(existingUser);

    const dto = {
      email: userDto.email,
      phone: userDto.phone,
      appointmentDate: '2025-08-10',
    };

    const result = await service.create(dto as any);

    expect(existingUser.appointmentDate).toEqual(new Date('2025-08-10'));
    expect((existingUser as any).save).toHaveBeenCalled();
    expect(result).toEqual(
      expect.objectContaining({ appointmentDate: new Date('2025-08-10') }),
    );
  });

  it('❌ should throw error if user exists without appointmentDate', async () => {
    model.findOne.mockResolvedValue({
      ...userDto,
      _id: userId,
      save: jest.fn(),
    });

    await expect(
      service.create({ email: userDto.email, phone: userDto.phone } as any),
    ).rejects.toThrow(BadRequestException);
  });
});
