import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });

    app.use(helmet());
    app.use(cookieParser());
    // app.use(bodyParser.urlencoded());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    await app.listen(process.env.APP_PORT || 3000);
}
bootstrap();
