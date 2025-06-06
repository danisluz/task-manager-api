import * as process from 'node:process';

export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'superSecretKey',
  expiresIn: process.env.JWT_EXPIRES_IN || '1h',
};