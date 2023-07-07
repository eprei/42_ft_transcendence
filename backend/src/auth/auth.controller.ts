import { UseGuards, Req, Res, Get } from '@nestjs/common'
import { OauthGuard } from './guards/oauth.guard'
import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    @Get('42')
    @UseGuards(OauthGuard)
    async login() {}

    @Get('42/redirect')
    @UseGuards(OauthGuard)
    loginRedirect(@Req() req, @Res() res) {
        console.log('Passport User: ', req.user)
        console.log('Session: ', req.session)
        res.redirect('http://localhost:4040/profile')

        return req.user
    }

    @Get('status')
    getStatus(@Req() req) {
        if (req.user) {
            return { status: 'success'}
        } else {
            return { status: 'error', message: 'Not authenticated' }
        }
    }
}
