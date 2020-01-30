import { Controller, Post, Res, Req, Body, UseGuards, HttpStatus, UnauthorizedException, BadRequestException, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';

@Controller('users')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post('auth')
    async postLogin(@Res() res, @Body() user: LoginUserDto) {
        try {
            const authUser = await this.authService.authenticate(user);
            return res.status(HttpStatus.OK).json({ status: 'success', data: authUser });
        } catch {
            throw new UnauthorizedException();
        }

    }

    @Post('register')
    async postRegister(@Res() res, @Body() user: CreateUserDto) {
        try {
            const newUser = await this.authService.signUp(user);
            return res.status(HttpStatus.OK).json({ status: 'success', data: newUser });
        } catch {
            throw new BadRequestException();
        }
    }
}