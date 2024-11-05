import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { RedisService } from 'src/modules/redis/services/redis.service';

import { Config, JwtConfig } from '../../../configs/config.type';

@Injectable()
export class AuthCacheService {
  private jwtConfig: JwtConfig;

  constructor(
    private readonly redisService: RedisService,
    private readonly configService: ConfigService<Config>,
  ) {
    this.jwtConfig = this.configService.get('jwt');
  }

  public async saveToken(
    token: string,
    userId: string,
    deviceId: string,
  ): Promise<void> {
    // допомагає в редісі швидко шукати записи
    const key = `ACCESS_TOKEN:${userId}:${deviceId}`;
    // видаляє попередні ключі якщо вони існують
    await this.redisService.deleteByKey(key);
    // додає нові ключі до редісу і токен який додається туди
    await this.redisService.addOneToSet(key, token);
    // додає час щоб токен видалився через деякий час
    await this.redisService.expire(key, this.jwtConfig.accessExpiresIn);
  }

  public async isAccessTokenExist(
    userId: string,
    deviceId: string,
    token: string,
  ): Promise<boolean> {
    const key = this.getKey(userId, deviceId);

    const set = await this.redisService.sMembers(key);
    return set.includes(token);
  }

  public async deleteToken(userId: string, deviceId: string): Promise<void> {
    const key = this.getKey(userId, deviceId);
    await this.redisService.deleteByKey(key);
  }

  private getKey(userId: string, deviceId: string): string {
    return `ACCESS_TOKEN:${userId}:${deviceId}`;
  }
}
