import {
  Controller,
  Get,
  Param,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UsersService } from './users.service';
import { Role } from '../auth/models/role.enum';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtGuard)
  @Roles(Role.ADMIN)
  @Get('profile/:id')
  async getProfile(@Param('id') id: string) {
    return this.usersService.findOne(Number(id));
  }

  @UseGuards(JwtGuard)
  @Roles(Role.ADMIN)
  @Put('success/:id')
  async updateSuccess(@Param('id') id: string) {
    return this.usersService.updateSuccess(Number(id));
  }
}
