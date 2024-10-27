import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UpdateUserDto } from './models/dto/req/update-user.req.dto';
import { ApiBearerAuth, ApiConflictResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserResDto } from './models/dto/res/user.res.dto';
import { UserListReqDto } from './models/dto/req/user-list.req.dto';
import { CreateUserReqDto } from './models/dto/req/create-user.req.dto';

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
  findOne(@Param('id', ParseUUIDPipe) id: string) {
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
