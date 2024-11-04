import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ArticleID, UserID } from 'src/common/types/entity-ids.type';
import { Config } from 'src/configs/config.type';
import { UserRepository } from 'src/modules/repository/services/user.repository';

import { UpdateUserDto } from '../models/dto/req/update-user.req.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly configService: ConfigService<Config>,
    private userRepository: UserRepository,
  ) {}

  findOne(id: UserID) {
    return `This action returns a #${id} user`;
  }

  update(id: UserID, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: UserID) {
    return `This action removes a #${id} user`;
  }

  public async checkAbilityToEditArticle(
    userId: UserID,
    articleId: ArticleID,
  ) {}
}
