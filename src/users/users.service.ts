import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number): Promise<User | undefined> {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async updateSuccess(id: number): Promise<User> {
    const { success } = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        success: success === 'BAN' ? 'SUCCESS' : 'BAN',
      },
    });
  }
}
