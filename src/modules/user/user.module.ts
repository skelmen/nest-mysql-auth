import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserRepository,
        ]),
    ],
    providers: [
        UserService,
    ],
    exports: [
        UserService,
    ]
})
export class UserModule { }
