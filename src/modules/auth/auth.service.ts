import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto, CreateUserDto } from './dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
    ) { }

    async authenticate(user: LoginUserDto) {
        const findUser = await this.userService.findByEmailWithPassword(user.email);
        if (!findUser || !(await findUser.validatePassword(user.password))) {
            throw new UnauthorizedException();
        }
        return findUser;
    }

    /**
     * New user registration
     * @param user CreateUserDto 
     */
    async signUp(user: CreateUserDto) {
        return await this.userService.create(user);
    }

}
