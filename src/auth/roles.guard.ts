/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CanActivate, ExecutionContext, Injectable, Redirect, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from './enums/organizationRoles.enum';
import { ROLES_KEY } from './decorators/currentUser.decorator';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthUser } from './intefaces/authUser.interface';
import { PUBLIC } from './decorators/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService, 
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const publicRoute = this.reflector.getAllAndOverride<boolean>(PUBLIC, [
      context.getHandler(),
      context.getClass(),
    ]);

    if(publicRoute) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const authorization = request.headers.authorization;
    const token = authorization && authorization.split(' ')[1];

    if(!token) throw new UnauthorizedException();

    const isTokenValid = this.jwtService.verify(token, { 
      secret: process.env.JWT_SECRET
    });

    if(!isTokenValid) Redirect('/auth/login');

    const authUser: AuthUser = this.jwtService.decode(token);
    
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if(!requiredRoles){
      return true;
    }

    return requiredRoles.some(role => authUser.roles.includes(role));
  }
}
