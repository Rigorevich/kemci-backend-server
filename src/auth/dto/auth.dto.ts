import { Role, Success } from '../models/role.enum';
import { IsEmail, IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class AuthDto {
  public id?: number;

  @IsString()
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20, { message: "Password can't be so short" })
  public password: string;
  public role?: Role;
  public success?: Success;
}
