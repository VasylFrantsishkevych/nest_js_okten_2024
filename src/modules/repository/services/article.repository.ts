import { Injectable } from '@nestjs/common';
import { ArticleID } from 'src/common/types/entity-ids.type';
import { ListArticleQueryDto } from 'src/modules/articles/models/dto/req/list-article-query.dto';
import { IUserData } from 'src/modules/auth/models/interfaces/user-data.interface';
import { DataSource, Repository } from 'typeorm';

import { ArticleEntity } from '../../../database/entities/article.entity';

@Injectable()
export class ArticleRepository extends Repository<ArticleEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ArticleEntity, dataSource.manager);
  }

  public async findAll(
    userData: IUserData,
    query: ListArticleQueryDto,
  ): Promise<[ArticleEntity[], number]> {
    const qb = this.createQueryBuilder('article');
    qb.leftJoinAndSelect('article.tags', 'tag');
    qb.leftJoinAndSelect('article.user', 'user');
    qb.leftJoinAndSelect(
      'user.followings',
      'following',
      'following.follower_id = :userId',
      // { userId: userData.userId },
    );

    qb.leftJoinAndSelect('article.likes', 'like', 'like.user_id = :userId');
    qb.setParameter('userId', userData.userId);

    if (query.search) {
      qb.andWhere('CONCAT(article.title, article.description) ILIKE :search');
      qb.setParameter('search', `%${query.search}%`);
    }
    if (query.tag) {
      qb.andWhere('tag.name = :tag', { tag: query.tag });
    }
    qb.take(query.limit);
    qb.skip(query.offset);

    return await qb.getManyAndCount();
  }

  public async getById(
    userData: IUserData,
    articleId: ArticleID,
  ): Promise<ArticleEntity> {
    const qb = this.createQueryBuilder('article');
    qb.leftJoinAndSelect('article.tags', 'tag');
    qb.leftJoinAndSelect('article.user', 'user');
    qb.leftJoinAndSelect(
      'user.followings',
      'following',
      'following.follower_id = :userId',
    );

    qb.leftJoinAndSelect('article.likes', 'like', 'like.user_id = :userId');
    qb.setParameter('userId', userData.userId);

    qb.where('article.id = :articleId', { articleId });
    return await qb.getOne();
  }
}
