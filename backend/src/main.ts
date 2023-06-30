import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'
import { ValidationPipe } from '@nestjs/common'
import * as session from 'express-session'
import * as passport from 'passport'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.setGlobalPrefix('api')

    app.enableCors({
        origin: 'http://localhost:4040',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type, Accept, Cookie, Set-Cookie',
        credentials: true,
    })

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
        })
    )

    app.use(
        session({
            secret: process.env.XP_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 3600000,
                sameSite: 'lax',
                httpOnly: true,
                secure: false,
                path: '/',
            },
        })
    )
    app.use(passport.initialize())
    app.use(passport.session())
    app.use((req, res, next) => {
        console.log(req.sessionID)
        next()
    })
    app.use((req, res, next) => {
        console.log('Session: ', req.session)
        next()
    })

    await app.listen(3000)
}

bootstrap().catch((error) => console.error(error))
