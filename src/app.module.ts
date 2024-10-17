import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ArticlesModule } from './articles/articles.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [UsersModule, ArticlesModule, CommentsModule],
})
export class AppModule {}
