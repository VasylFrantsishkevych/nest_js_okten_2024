import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConflictResponse, ApiTags } from '@nestjs/swagger';

import { UpdateUserDto } from './models/dto/req/update-user.req.dto';
import { UsersService } from './services/users.service';

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
  @Get(':id')
  public async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
