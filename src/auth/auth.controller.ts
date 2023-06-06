import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegisterDTO } from './dto/auth-register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: AuthRegisterDTO) {
    return this.authService.register(body);
  }
}
