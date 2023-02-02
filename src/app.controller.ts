import {
  Controller,
  Get,
  Post,
  Header,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async findAll() {
    throw new HttpException('Error', HttpStatus.FORBIDDEN);
  }

  @Get(':id')
  getId(@Param('id') id: string): string {
    return `This is ${id}`;
  }

  @Post()
  @Header('Cache-Control', 'none')
  create(): string {
    return this.appService.create();
  }
}
