import {
    UseGuards,
    Controller,
    UnauthorizedException,
    Req,
    Res,
    Get,
    Post,
    Body,
    Request,
    NotFoundException,
} from '@nestjs/common'
import { OauthGuard } from './guards/oauth.guard'
import { ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { UserService } from 'src/user/user.service'
import { AuthGuard } from '@nestjs/passport'
import { AuthenticatedGuard } from './guards/authenticated.guard'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

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
    @UseGuards(OauthGuard)
    async turnOnTwoFactorAuthentication(@Req() request, @Body() body) {
        const isCodeValid = this.authService.isTwoFactorAuthenticationCodeValid(
            body.twoFactorAuthenticationCode,
            request.user
        )
        if (!isCodeValid) {
            throw new UnauthorizedException('Wrong authentication code')
        }
        await this.userService.turnOnTwoFactorAuthentication(request.user.id)
    }

    @Post('2fa/authenticate')
    // @UseGuards(AuthenticatedGuard)
    async authenticate(@Request() req: any, @Body() body) {
        const user = await this.userService.findOne(req.user.id)

        if (!user) {
            throw new NotFoundException('User not found')
        }
        const isCodeValid = this.authService.isTwoFactorAuthenticationCodeValid(
            body.twoFactorAuthenticationCode,
            user
        )

        if (!isCodeValid) {
            throw new UnauthorizedException('Wrong authentication code')
        }

		req.session.needTFA = false
		return user
    }

    @Get('2fa/generate')
    // @UseGuards(OauthGuard)
    async generateQR(@Request() req: any) {
        const user = await this.userService.findOne(req.user.id)

        if (!user) {
            throw new NotFoundException('User not found')
        }
        const secretAndUrl =
            await this.authService.generateTwoFactorAuthenticationSecret(user)

        const qrCode = await this.authService.generateQrCodeDataURL(
            (
                await secretAndUrl
            ).otpauthUrl
        )
        return qrCode
    }
}
