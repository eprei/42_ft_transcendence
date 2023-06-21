import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'
import { ValidationPipe } from '@nestjs/common'
import * as session from 'express-session'
import * as passport from 'passport'


async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    const corsOptions: CorsOptions = {
        origin: 'http://localhost:4040',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type, Accept',
    }
    app.setGlobalPrefix('api')
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
        })
    )
    app.enableCors(corsOptions)
    app.use(
        session({
            secret: 'keyboard cat', // this will be changed later by an environment variable or other more secure method
            resave: false,
            saveUninitialized: false,
            cookie: { maxAge: 3600000 },
        }),
    );
    app.use(passport.initialize());
    app.use(passport.session());

    await app.listen(3000)
}

bootstrap()
