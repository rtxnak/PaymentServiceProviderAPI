import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthLoginDTO } from './dto/auth-login.dto';
import {
  ApiBadRequestResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthLoginReponseDTO } from './dto/auth-login-response.dto';
import { AuthRegisterReponseDTO } from './dto/auth-register-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async register(@Body() body: AuthRegisterDTO): Promise<AuthLoginReponseDTO> {
    return this.authService.register(body);
  }

  @Post('login')
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async login(
    @Body() { email, password }: AuthLoginDTO,
  ): Promise<AuthRegisterReponseDTO> {
    return this.authService.login(email, password);
  }
}
