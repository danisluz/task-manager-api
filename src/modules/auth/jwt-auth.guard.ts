import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info, context: ExecutionContext) {
    if (err || !user) {
      const errorMessage = info?.message || 'Token inválido ou expirado';

      if (errorMessage === 'No auth token') {
        throw err || new UnauthorizedException('Token não fornecido');
      }

      if (errorMessage === 'jwt expired') {
        throw err || new UnauthorizedException('Token expirado');
      }

      if (errorMessage === 'jwt malformed') {
        throw new UnauthorizedException('Token malformado');
      }

      throw new UnauthorizedException(errorMessage);
    }
    return user;
  }
}
