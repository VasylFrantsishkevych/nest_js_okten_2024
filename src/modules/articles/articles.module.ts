import { Module } from '@nestjs/common';
import { ArticlesService } from './services/articles.service';
import { ArticlesController } from './articles.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
