import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument } from './schemas/user.schema';
import { Types } from 'mongoose';

describe('UserController (Strict)', () => {
  let controller: UserController;
  let service: UserService;

  const mockId = new Types.ObjectId().toHexString();

  const mockUser: UserDocument = {
    _id: mockId,
    name: 'Dvd',
    email: 'dvd@email.com',
    phone: '0123456789',
    address: 'Hà Nội',
    appointmentDate: new Date('2025-08-01'),
    save: jest.fn(),
  } as unknown as UserDocument;

  const mockUserList: UserDocument[] = [
    {
      _id: new Types.ObjectId().toHexString(),
      name: 'Alice',
      email: 'a@email.com',
      phone: '111',
      address: 'HN',
      appointmentDate: undefined,
      save: jest.fn(),
    },
    {
      _id: new Types.ObjectId().toHexString(),
      name: 'Bob',
      email: 'b@email.com',
      phone: '222',
      address: 'SG',
      appointmentDate: new Date(),
      save: jest.fn(),
    },
  ] as unknown as UserDocument[];

  const mockUserService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('✅ should create user', async () => {
    const dto: CreateUserDto = {
      name: mockUser.name,
      email: mockUser.email,
      phone: mockUser.phone,
      address: mockUser.address,
      appointmentDate: mockUser.appointmentDate?.toISOString(), // simulate string input
    };

    mockUserService.create.mockResolvedValue(mockUser);

    const result = await controller.create(dto);
    expect(result).toEqual(mockUser);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('✅ should return all users', async () => {
    mockUserService.findAll.mockResolvedValue(mockUserList);

    const result = await controller.findAll();
    expect(result).toEqual(mockUserList);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('✅ should return user by id', async () => {
    mockUserService.findOne.mockResolvedValue(mockUser);

    const result = await controller.findOne(mockId);
    expect(result).toEqual(mockUser);
    expect(service.findOne).toHaveBeenCalledWith(mockId);
  });

  it('✅ should update user', async () => {
    const updateDto: UpdateUserDto = {
      name: 'Updated Dvd',
    };

    const updatedUser = { ...mockUser, name: 'Updated Dvd' };
    mockUserService.update.mockResolvedValue(updatedUser);

    const result = await controller.update(mockId, updateDto);
    expect(result).toEqual(updatedUser);
    expect(service.update).toHaveBeenCalledWith(mockId, updateDto);
  });

  it('✅ should delete user', async () => {
    mockUserService.remove.mockResolvedValue(undefined);

    const result = await controller.remove(mockId);
    expect(result).toBeUndefined();
    expect(service.remove).toHaveBeenCalledWith(mockId);
  });
});
