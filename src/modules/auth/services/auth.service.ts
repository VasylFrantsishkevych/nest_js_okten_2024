import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserMapper } from 'src/modules/users/services/user.mapper';

import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { SignInReqDto } from '../models/dto/req/sign-in.req.dto';
import { SignUpReqDto } from '../models/dto/req/sign-up.req.dto';
import { AuthResDto } from '../models/dto/res/auth.res.dto';
import { AuthCacheService } from './auth-cache.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly authCacheService: AuthCacheService,
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  public async signUp(dto: SignUpReqDto): Promise<AuthResDto> {
    // перевіряє емеіл і у випадку якщо існує кидаємо помилку
    await this.isEmailNotExistOrThrow(dto.email);
    // хешує пароль перед зберіганням в базу
    const password = await bcrypt.hash(dto.password, 10);
    // створюємо та зберігаємо нового користувачи. В методі save викликаємо спочатку метод create.
    // спочатку створюємо потім зберігаємо користувача.
    const user = await this.userRepository.save(
      this.userRepository.create({ ...dto, password }),
    );
    // створюємо нову пару токенів
    const tokens = await this.tokenService.generateAuthTokens({
      userId: user.id,
      deviceId: dto.deviceId,
    });
    await Promise.all([
      // зберігаємо access токен в редіс
      this.authCacheService.saveToken(
        tokens.accessToken,
        user.id,
        dto.deviceId,
      ),
      // зберігаємо рефреш токен в базу даних
      this.refreshTokenRepository.save(
        this.refreshTokenRepository.create({
          user_id: user.id,
          deviceId: dto.deviceId,
          refreshToken: tokens.refreshToken,
        }),
      ),
    ]);

    return { user: UserMapper.toResDto(user), tokens };
  }

  public async signIn(dto: SignInReqDto): Promise<any> {
    // return await this.authService.create(dto);
  }

  private async isEmailNotExistOrThrow(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new Error('Email already exists');
    }
  }
}
