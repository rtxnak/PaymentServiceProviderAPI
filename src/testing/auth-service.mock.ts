import { AuthService } from '../auth/auth.service';
import { accessToken } from './access-token.mock';
import { jwtPayload } from './jwt-payload.mock';

export const authServiceMock = {
  provide: AuthService,
  useValue: {
    createToken: jest.fn().mockResolvedValue({ accessToken }),
    checkToken: jest.fn().mockResolvedValue(jwtPayload),
    login: jest.fn().mockResolvedValue({ accessToken }),
    register: jest.fn().mockResolvedValue({ accessToken }),
  },
};
