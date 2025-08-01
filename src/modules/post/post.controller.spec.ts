import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

describe('PostController', () => {
  let controller: PostController;
  let service: PostService;

  const mockPost = {
    _id: 1,
    name: 'Test Post',
    author: 'Dvd',
    content: 'Some content',
    createdAt: new Date(),
    categoryId: 2,
  };

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findByCategory: jest.fn(),
    countByCategory: jest.fn(),
    getLatestThree: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [
        {
          provide: PostService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<PostController>(PostController);
    service = module.get<PostService>(PostService);
  });

  it('✅ create() should call service and return post', async () => {
    const dto: CreatePostDto = {
      name: mockPost.name,
      author: mockPost.author,
      content: mockPost.content,
      categoryId: mockPost.categoryId,
    };
    mockService.create.mockResolvedValue(mockPost);
    const result = await controller.create(dto);
    expect(result).toEqual(mockPost);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('✅ findAll() should return all posts', async () => {
    mockService.findAll.mockResolvedValue([mockPost]);
    const result = await controller.findAll();
    expect(result).toEqual([mockPost]);
  });

  it('✅ findOne() should return post by ID', async () => {
    mockService.findOne.mockResolvedValue(mockPost);
    const result = await controller.findOne('1');
    expect(result).toEqual(mockPost);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('✅ findByCategory() should return posts by category', async () => {
    mockService.findByCategory.mockResolvedValue([mockPost]);
    const result = await controller.findByCategory(2);
    expect(result).toEqual([mockPost]);
    expect(service.findByCategory).toHaveBeenCalledWith(2);
  });

  it('✅ countByCategory() should return post count', async () => {
    mockService.countByCategory.mockResolvedValue(5);
    const result = await controller.countByCategory('2');
    expect(result).toBe(5);
  });

  it('✅ getLatestThree() should return 3 latest posts', async () => {
    mockService.getLatestThree.mockResolvedValue([mockPost]);
    const result = await controller.getLatestThree();
    expect(result).toEqual([mockPost]);
  });

  it('✅ update() should update post by ID', async () => {
    const updated = { ...mockPost, name: 'Updated' };
    const dto: UpdatePostDto = { name: 'Updated' };
    mockService.update.mockResolvedValue(updated);
    const result = await controller.update('1', dto);
    expect(result).toEqual(updated);
  });

  it('✅ remove() should delete post by ID', async () => {
    mockService.remove.mockResolvedValue(undefined);
    const result = await controller.remove('1');
    expect(result).toBeUndefined();
  });
});
