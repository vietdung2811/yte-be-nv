// Tạo comment khi:
// Post tồn tại
// User có hoặc chưa có
// Auto tăng _id
// Ném lỗi nếu post không tồn tại
// Trả về danh sách comment theo post

import { Test, TestingModule } from '@nestjs/testing';
import { CommentService } from './post.comment.service';
import { getModelToken } from '@nestjs/mongoose';
import { Comment } from './schemas/post.comment.schema';
import { User } from '../users/schemas/user.schema';
import { Post } from '../post/schemas/post.schema';
import { NotFoundException } from '@nestjs/common';

describe('CommentService', () => {
  let service: CommentService;
  let commentModel: any;
  let userModel: any;
  let postModel: any;

  const mockCommentModel = {
    findOne: jest.fn(),
    sort: jest.fn(),
    exec: jest.fn(),
    create: jest.fn(),
    find: jest.fn(),
    populate: jest.fn(),
  };

  const mockUserModel = {
    findOne: jest.fn(),
    create: jest.fn(),
  };

  const mockPostModel = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentService,
        { provide: getModelToken(Comment.name), useValue: mockCommentModel },
        { provide: getModelToken(User.name), useValue: mockUserModel },
        { provide: getModelToken(Post.name), useValue: mockPostModel },
      ],
    }).compile();

    service = module.get<CommentService>(CommentService);
    commentModel = module.get(getModelToken(Comment.name));
    userModel = module.get(getModelToken(User.name));
    postModel = module.get(getModelToken(Post.name));
  });

  afterEach(() => jest.clearAllMocks());

  it('✅ should create a comment (new user)', async () => {
    const dto = {
      name: 'Dvd',
      email: 'dvd@email.com',
      phone: '123456789',
      content: 'Góp ý!',
    };

    const mockUser = { _id: 'user123' };
    const mockPost = { _id: 1 };

    postModel.findOne.mockResolvedValue(mockPost);
    userModel.findOne.mockResolvedValue(null);
    userModel.create.mockResolvedValue(mockUser);
    commentModel.findOne.mockReturnValue({
      sort: () => ({ exec: () => Promise.resolve({ _id: 1 }) }),
    });
    commentModel.create.mockResolvedValue({ content: dto.content });

    const result = await service.create(1, dto);

    expect(result).toEqual({ content: dto.content });
    expect(postModel.findOne).toHaveBeenCalledWith({ _id: 1 });
    expect(userModel.create).toHaveBeenCalled();
    expect(commentModel.create).toHaveBeenCalled();
  });

  it('❌ should throw error if post not found', async () => {
    postModel.findOne.mockResolvedValue(null);
    await expect(
      service.create(1, {
        name: 'Dvd',
        email: 'a@email.com',
        phone: '111',
        content: 'Test',
      }),
    ).rejects.toThrow(NotFoundException);
  });

  it('✅ should return comments by postId', async () => {
    const comments = [{ content: 'Comment 1' }];
    commentModel.find.mockReturnValue({
      populate: jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(comments),
        }),
      }),
    });

    const result = await service.findByPost(1);
    expect(result).toEqual(comments);
    expect(commentModel.find).toHaveBeenCalledWith({ postId: 1 });
  });
});
