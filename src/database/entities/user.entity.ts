import { UserID } from 'src/common/types/entity-ids.type';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ArticleEntity } from './article.entity';
import { CommentEntity } from './comment.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { FollowEntity } from './follow.entity';
import { LikeEntity } from './like.entity';
import { CreateUpdateModel } from './models/create-updatemodel';
import { RefreshTokenEntity } from './refresh-token.entity';

@Entity(TableNameEnum.USERS)
export class UserEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: UserID;

  @Index()
  @Column('text')
  name: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text')
  password: string;

  @Column('boolean', { default: true })
  isActive: boolean;

  @Column('text', { nullable: true })
  bio: string;

  @Column('text', { nullable: true })
  image: string;

  @Column('timestamp', { nullable: true })
  deleted?: Date;

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  refreshTokens?: RefreshTokenEntity[];

  @OneToMany(() => ArticleEntity, (entity) => entity.user)
  articles?: ArticleEntity[];

  @OneToMany(() => LikeEntity, (entity) => entity.user)
  likes?: LikeEntity[];

  @OneToMany(() => CommentEntity, (entity) => entity.user)
  comments?: CommentEntity[];

  @OneToMany(() => FollowEntity, (entity) => entity.follower)
  followers?: FollowEntity[];

  @OneToMany(() => FollowEntity, (entity) => entity.following)
  followings?: FollowEntity[];
}
