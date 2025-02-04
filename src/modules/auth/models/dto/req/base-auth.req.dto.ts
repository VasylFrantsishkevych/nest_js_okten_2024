import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseUserReqDto } from 'src/modules/users/models/dto/req/base-user.req.dto';

export class BaseAuthReqDto extends PickType(BaseUserReqDto, [
  'email',
  'password',
  'bio',
  'image',
  'name',
]) {
  @IsNotEmpty()
  @IsString()
  readonly deviceId: string;
}
