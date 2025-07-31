import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-post.comment.dto';

export class UpdatePostCommentDto extends PartialType(CreateCommentDto) {}
