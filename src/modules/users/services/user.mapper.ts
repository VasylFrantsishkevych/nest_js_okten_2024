import { IJwtPayload } from 'src/modules/auth/models/interfaces/jwt-payload.interface';

import { UserEntity } from '../../../database/entities/user.entity';
import { UserResDto } from '../models/dto/res/user.res.dto';

export class UserMapper {
  public static toResDto(user: UserEntity): UserResDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      image: `${process.env.AWS_S3_ENDPOINT}/${user.image}`,
      isFollowed: user.followings?.length > 0 || false,
    };
  }
  public static toIUserData(user: UserEntity, jwtPayload: IJwtPayload): any {
    return {
      userId: user.id,
      deviceId: jwtPayload.deviceId,
      email: user.email,
    };
  }
}
