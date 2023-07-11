import {
    UseGuards,
    Controller,
    Req,
    Res,
    Get,
    Post,
    Body,
    Request,
} from '@nestjs/common'
import { OauthGuard } from './guards/oauth.guard'
import { ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { AuthenticatedGuard } from './guards/authenticated.guard'
import { TotpGuard } from './guards/totp.guard'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

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
            return { status: 'success' }
        } else {
            return { status: 'error', message: 'Not authenticated' }
        }
    }

    @Post('2fa/turn-on')
    @UseGuards(AuthenticatedGuard)
    async activate2fa(@Request() req: any, @Body() body) {
        return await this.authService.activate2fa(req, body)
    }

    @Post('2fa/turn-off')
    @UseGuards(AuthenticatedGuard)
    async deactivate2fa(@Request() req: any) {
        return await this.authService.deactivate2fa(req)
    }

    @Post('2fa/authenticate')
    @UseGuards(TotpGuard)
    async authenticateTOTP(@Request() req: any, @Body() body) {
        return await this.authService.authenticateTOTP(req, body)
    }

    @Get('2fa/generate')
    @UseGuards(AuthenticatedGuard)
    async generateQR(@Request() req: any) {
        return await this.authService.generateQR(req)
    }
}
