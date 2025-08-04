import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { Post } from './schemas/post.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

describe('PostService (strict)', () => {
  let service: PostService;
  let model: jest.Mocked<Model<Post & Document>>;

  const mockPost = {
    _id: 1,
    name: 'Test Post',
    author: 'Dvd',
    content: 'Nội dung gì đó...',
    createdAt: new Date(),
    categoryId: 2,
  } as unknown as Post;

  const mockPostArray = [mockPost];

  const createMockPostModel = (): Partial<
    jest.Mocked<Model<Post & Document>>
  > => ({
    create: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    countDocuments: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: getModelToken(Post.name),
          useValue: createMockPostModel(),
        },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
    model = module.get(getModelToken(Post.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('✅ create() should create a post', async () => {
    const dto: CreatePostDto = {
      name: mockPost.name,
      author: mockPost.author,
      content: mockPost.content,
      categoryId: mockPost.categoryId,
    };

    (model.create as jest.Mock).mockResolvedValue(mockPost);
    const result = await service.create(dto);

    expect(model.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(mockPost);
  });
});
