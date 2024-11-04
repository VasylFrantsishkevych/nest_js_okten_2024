import { TagID } from 'src/common/types/entity-ids.type';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ArticleEntity } from './article.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { CreateUpdateModel } from './models/create-updatemodel';

@Entity(TableNameEnum.TAGS)
export class TagEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: TagID;

  @Column('text')
  name: string;

  @ManyToMany(() => ArticleEntity, (entity) => entity.tags)
  @JoinTable()
  articles?: ArticleEntity[];
}
