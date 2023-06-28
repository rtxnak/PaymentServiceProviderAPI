import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { userRepositoryMock } from '../testing/user-repository.mock';
import { userServiceMock } from '../testing/user-service.mock';
import { userEntityList } from '../testing/user-entity-list.mock';
import { accessToken } from '../testing/access-token.mock';
import { jwtServiceMock } from '../testing/jwt-service.mock';
import { authRegisterDtoMock } from '../testing/auth-register-dto.mock';
import { jwtPayload } from '../testing/jwt-payload.mock';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entity/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        userRepositoryMock,
        jwtServiceMock,
        userServiceMock,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get(getRepositoryToken(UserEntity));
  });

  test('module definition', () => {
    expect(authService).toBeDefined();
  });

  describe('token methods', () => {
    test('SUCCESS on createToken method', () => {
      const result = authService.createToken(userEntityList[0]);

      expect(result).toEqual({
        accessToken,
      });
    });

    test('SUCCESS on checkToken method', () => {
      const result = authService.checkToken(accessToken);

      expect(result).toEqual(jwtPayload);
    });
  });

  describe('Authentication methods', () => {
    test('SUCCESS on register method', async () => {
      const result = await authService.register(authRegisterDtoMock);

      expect(result).toEqual({ accessToken });
    });

    test('SUCCESS on login method', async () => {
      const result = await authService.login('rafael@email.com', '123456a!A');

      expect(result).toEqual({ accessToken });
    });

    test('FAILURE on login method with unregistered email', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(null);

      await expect(
        authService.login('wrong@email.com', '123456a!A'),
      ).rejects.toEqual(
        new UnauthorizedException('Email e/ou senha incorretos'),
      );
    });

    test('FAILURE on login method with wrong password', async () => {
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false as never);

      await expect(
        authService.login('rafael@email.com', 'Wrongpass@123'),
      ).rejects.toEqual(
        new UnauthorizedException('Email e/ou senha incorretos'),
      );
    });
  });
});
