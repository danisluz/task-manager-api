import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn().mockResolvedValue({
              id: '1',
              name: 'New User',
              email: 'newuser@example.com',
              password: 'hashed_password',
              createdAt: new Date(),
              updatedAt: new Date(),
              roles: [],
            }),
            createUser: jest.fn().mockResolvedValue({
              id: '1',
              name: 'New User',
              email: 'newuser@example.com',
              password: 'hashed_password',
              createdAt: new Date(),
              updatedAt: new Date(),
              roles: [],
            }),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mocked_token'),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);

    // Mock do bcrypt para sempre retornar true na comparação
    jest.spyOn(bcrypt, 'compare').mockImplementation(async () => true);
  });

  it('deve retornar um token JWT ao fazer login', async () => {
    const loginData = {
      email: 'newuser@example.com',
      password: 'newpassword',
    };

    const result = await authService.login(loginData);
    expect(result).toEqual({ access_token: 'mocked_token' });
  });

  it('deve lançar UnauthorizedException se o login falhar', async () => {
    jest.spyOn(authService, 'validateUser').mockResolvedValue(null);

    try {
      await authService.login({ email: 'invalid@example.com', password: 'wrongpassword' });
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException);
      expect(error.message).toBe('Credenciais inválidas');
    }
  });
});
