import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/req/update-user.req.dto';
import { ApiBearerAuth, ApiConflictResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserResDto } from './dto/res/user.res.dto';
import { UserListReqDto } from './dto/req/user-list.req.dto';
import { CreateUserReqDto } from './dto/req/create-user.req.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @ApiForbiddenResponse({ description: 'Forbidden' })
  // @ApiNotFoundResponse({ description: 'User not found' })
  // @ApiConflictResponse({ description: 'Conflict' })
  // @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  // @ApiOperation({
  //   summary: 'Create user',
  //   description: 'Create a new user',
  //   deprecated: true,
  // })
  @ApiBearerAuth()
  @ApiConflictResponse({ description: 'Conflict' })
  @Post()
  async create(@Body() createUserDto: CreateUserReqDto): Promise<UserResDto> {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query() query: UserListReqDto) {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
