import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthRegisterDTO } from './dto/auth-register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  createToken(user: UserEntity) {
    return {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.cnpj,
        },
        {
          expiresIn: '7 days',
          subject: String(user.id),
          issuer: 'login',
          audience: 'users',
        },
      ),
    };
  }

  async register(data: AuthRegisterDTO) {
    delete data.role;
    const user = await this.userService.createNewUser(data);
    return this.createToken(user);
  }
}
