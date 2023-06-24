import { UseGuards, Req, Res, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Controller } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    @Get('42')
    @UseGuards(AuthGuard('42'))
    async login() {}

    @Get('42/redirect')
    @UseGuards(AuthGuard('42'))
    loginRedirect(@Req() req, @Res() res) {
        console.log('User: ', req.user);
        console.log('Session: ', req.session);
        res.redirect('http://localhost:4040/profile');
        console.log("Response headers:", res.getHeaders());

        return req.user;
    }

    @Get('status')
    getStatus(@Req() req) {
        if (req.user) {
            return { status: 'success', user: req.user };
        } else {
            return { status: 'error', message: 'Not authenticated' };
        }
    }
}
