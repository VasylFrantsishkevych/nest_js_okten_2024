import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  create(createCommentDto: CreateCommentDto) {
    return 'This action adds a new comment';
  }

  findAll() {
    return `This action returns all comments`;
  }
}
