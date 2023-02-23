import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { Role, Success } from '../../auth/models/role.enum';

export class UserDto {
  public id?: number;
  public email: string;
  public password: string;
  public role?: Role;
  public success?: Success;
}
