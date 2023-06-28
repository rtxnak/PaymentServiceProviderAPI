import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '../guards/auth.guard';
import { guardMock } from '../testing/guard.mock';
import { AuthController } from './auth.controller';
import { accessToken } from '../testing/access-token.mock';
import { authRegisterDtoMock } from '../testing/auth-register-dto.mock';
import { authLoginDtoMock } from '../testing/auth-login-dto.mock';
import { authServiceMock } from '../testing/auth-service.mock';

describe('UserController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [authServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .compile();

    authController = module.get<AuthController>(AuthController);
  });

  test('module definition', () => {
    expect(authController).toBeDefined();
  });

  describe('Authentication methods', () => {
    test('SUCCESS on login method', async () => {
      const result = await authController.login(authLoginDtoMock);

      expect(result).toEqual({ accessToken });
    });

    test('SUCCESS on register method', async () => {
      const result = await authController.register(authRegisterDtoMock);

      expect(result).toEqual({ accessToken });
    });
  });
});
