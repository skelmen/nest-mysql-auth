import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from 'nestjs-config';
import * as path from 'path';
import { AuthModule, UserModule } from './modules';
import { TypeOrmModule  } from '@nestjs/typeorm';

@Module({
    imports: [
        ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
        TypeOrmModule.forRootAsync({
            useFactory: (config: ConfigService) => config.get('database'),
            inject: [ConfigService],
        }),
        UserModule,
        AuthModule,
    ],
})
export class AppModule {}
