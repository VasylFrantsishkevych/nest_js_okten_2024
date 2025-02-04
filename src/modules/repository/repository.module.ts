import { Global, Module } from '@nestjs/common';

import { ArticleRepository } from './services/article.repository';
import { CommentRepository } from './services/comment.repository';
import { FollowRepository } from './services/follow.repository';
import { LikeRepository } from './services/like.repository';
import { RefreshTokenRepository } from './services/refresh-token.repository';
import { TagRepository } from './services/tag.repository';
import { UserRepository } from './services/user.repository';

const repositories = [
  UserRepository,
  ArticleRepository,
  TagRepository,
  RefreshTokenRepository,
  LikeRepository,
  FollowRepository,
  CommentRepository,
];

@Global()
@Module({
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoryModule {}
