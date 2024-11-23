import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '@shared/data-objects';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(
    username: string,
    pass: string
  ): Promise<Partial<UserDto>> {
    const user = await this.usersService.findOne(username);

    if (user) {
      const isMatch = await compare(pass, user.password);

      if (isMatch) {
        return {
          _id: user._id.toString(),
          username: user.username,
          email: user.email,
        };
      }
    }

    return null;
  }

  login(user: Partial<UserDto>) {
    const payload = { username: user.username, sub: user._id };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
