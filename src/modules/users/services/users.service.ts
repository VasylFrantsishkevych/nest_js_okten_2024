import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserID } from 'src/common/types/entity-ids.type';
import { Config } from 'src/configs/config.type';
import { UserEntity } from 'src/database/entities/user.entity';
import { IUserData } from 'src/modules/auth/models/interfaces/user-data.interface';
import { UserRepository } from 'src/modules/repository/services/user.repository';

import { UpdateUserDto } from '../models/dto/req/update-user.req.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly configService: ConfigService<Config>,
    private userRepository: UserRepository,
  ) {}

  public async findMe(userData: IUserData) {
    return `Is good ${userData.userId}`;
  }

  public async updateMe(userData: IUserData, dto: UpdateUserDto) {
    return `This action updates a #${userData.userId} user`;
  }

  public async removeMe(userData: IUserData) {
    return `This action removes a #${userData} user`;
  }

  public async findOne(userId: UserID): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ id: userId });
  }
}
