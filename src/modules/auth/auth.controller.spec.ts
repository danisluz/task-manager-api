import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn().mockResolvedValue({
              id: '1',
              email: 'newuser@example.com',
              password: 'hashed_password'
            }),
            createUser: jest.fn().mockResolvedValue({
              id: '1',
              email: 'newuser@example.com',
              password: 'hashed_password'
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

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);

    // Mockando o bcrypt para sempre retornar true na comparação
    jest.spyOn(bcrypt, 'compare').mockImplementation(async () => true);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  it('deve realizar login e retornar um token', async () => {
    const loginData = {
      email: 'newuser@example.com',
      password: 'newpassword',
    };

    // Mockando o método login do AuthService
    jest.spyOn(authService, 'login').mockResolvedValue({ access_token: 'mocked_token' });

    const result: any = await authController.login(loginData);
    expect(result).toEqual({ access_token: 'mocked_token' });
  });

  it('deve retornar UnauthorizedException se as credenciais forem inválidas', async () => {
    const loginData = {
      email: 'invalid@example.com',
      password: 'wrongpassword',
    };

    // Mockando o método login do AuthService para lançar a exceção
    jest.spyOn(authService, 'login').mockImplementation(() => {
      throw new UnauthorizedException('Credenciais inválidas');
    });

    try {
      await authController.login(loginData);
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException);
      expect(error.message).toBe('Credenciais inválidas');
    }
  });


});
