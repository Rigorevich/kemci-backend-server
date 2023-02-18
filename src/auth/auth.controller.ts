import { Body, Controller, Get, Post, Request, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @Post('login')
  async login(@Request() req, @Response() res, @Body() dto: AuthDto) {
    return this.authService.login(dto, req, res);
  }

  @Get('logout')
  async logout(@Request() req, @Response() res) {
    return this.authService.logout(req, res);
  }
}
