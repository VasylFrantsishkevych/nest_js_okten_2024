import { RefreshTokenID, UserID } from 'src/common/types/entity-ids.type';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { TableNameEnum } from './enums/table-name.enum';
import { CreateUpdateModel } from './models/create-updatemodel';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.REFRESH_TOKENS)
export class RefreshTokenEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: RefreshTokenID;

  @Column('text')
  refreshToken: string;

  @Column('text')
  deviceId: string;

  @Column()
  user_id: UserID;
  @ManyToOne(() => UserEntity, (entity) => entity.refreshTokens)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;
}
