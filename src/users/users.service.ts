import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/req/update-user.req.dto';
import { UserResDto } from './dto/res/user.res.dto';
import { CreateUserReqDto } from './dto/req/create-user.req.dto';

@Injectable()
export class UsersService {
  public async create(createUserDto: CreateUserReqDto): Promise<UserResDto> {
    return {} as UserResDto;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
