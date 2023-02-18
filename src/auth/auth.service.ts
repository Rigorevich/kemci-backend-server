import {
  Injectable,
  BadRequestException,
  ForbiddenException,
  NotAcceptableException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { Request, Response } from 'express';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new NotAcceptableException('Could not find the user');
    }

    const passwordValid = await bcrypt.compare(password, user.hash_password);

    if (user && passwordValid) {
      return user;
    }
    return null;
  }

  async signup(user: AuthDto): Promise<{ message: string }> {
    const { email, password } = user;

    const userExists = await this.prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new BadRequestException(
        'Account with the same email already exists',
      );
    }

    const hash_password = await this.hashPassword(password);

    await this.prisma.user.create({
      data: {
        email,
        hash_password,
      },
    });

    return { message: 'User created successfully' };
  }

  async login(user: AuthDto, req: Request, res: Response): Promise<Response> {
    const { email, password, success } = user;

    const foundUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!foundUser) {
      throw new BadRequestException('The user was not found');
    }

    const compareSuccess = await this.comparePasswords(
      password,
      foundUser.hash_password,
    );

    if (!compareSuccess) {
      throw new BadRequestException('Wrong credentials');
    }

    if (success === 'BAN') {
      throw new BadRequestException('Your account has a blocking');
    }

    const token = await this.signToken(foundUser.id, foundUser.email);

    if (!token) {
      throw new ForbiddenException('Could not login');
    }

    res.cookie('token', token, {});
    res.cookie('user', foundUser, {});

    return res.send({ message: 'Logged in successfully' });
  }

  async logout(req: Request, res: Response) {
    res.clearCookie('token');
    res.clearCookie('user');
    return res.send({ message: 'Logged out successfully' });
  }

  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  async comparePasswords(
    password: string,
    hash_password: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash_password);
  }

  async signToken(id: number, email: string): Promise<string> {
    const payload = {
      id,
      email,
    };

    return await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });
  }
}
