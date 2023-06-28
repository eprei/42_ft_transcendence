import { UseGuards, Req, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Controller } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    @Get('42')
    @UseGuards(AuthGuard('42'))
    async login() {}

    @Get('42/redirect')
    @UseGuards(AuthGuard('42'))
    loginRedirect(@Req() req) {
        //return jwt and redirect to frontend
        return req.user;
    }
}
