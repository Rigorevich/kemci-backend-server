import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UsersService } from './users.service';
import { Role } from '../auth/models/role.enum';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtGuard)
  @Roles(Role.ADMIN)
  @Get('profile')
  async getProfile(@Request() req) {
    return { message: 'lox' };
  }
}
