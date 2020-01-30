import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt-api' }),
    ],
    controllers: [ AuthController ],
    providers: [
        AuthService,
    ],
})
export class AuthModule {}
