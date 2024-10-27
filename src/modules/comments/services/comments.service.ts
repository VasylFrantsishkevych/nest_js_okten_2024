import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from '../models/dto/req/create-comment.dto';
import { UpdateCommentDto } from '../models/dto/req/update-comment.dto';

@Injectable()
export class CommentsService {
  create(createCommentDto: CreateCommentDto) {
    return 'This action adds a new comment';
  }

  findAll() {
    return `This action returns all comments`;
  }
}
