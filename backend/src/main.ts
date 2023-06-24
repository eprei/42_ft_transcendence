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
        allowedHeaders: 'Content-Type, Accept, Cookie, Set-Cookie',
        credentials: true,
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
            cookie: { 
                maxAge: 3600000,
                sameSite: 'none',
                httpOnly: true,
                secure: false,
            },
        }),
    );
    app.use(passport.initialize());
    app.use(passport.session());
    app.use((req, res, next) => { console.log(req.sessionID); next(); });
    app.use((req, res, next) => {
        console.log('Session: ', req.session);
        next();
    });
    

    await app.listen(3000)
}

bootstrap().catch((error) => console.error(error));
