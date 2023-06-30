import { Injectable } from '@nestjs/common'
import { User } from '../types/User'
import { authenticator } from 'otplib'
import { UserService } from 'src/user/user.service'
import { toDataURL } from 'qrcode'

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async generateTwoFactorAuthenticationSecret(user: User) {
        const secret = authenticator.generateSecret()

        const otpauthUrl = authenticator.keyuri(
            user.nickname,
            'COSMIC_PONG',
            secret
        )

        await this.userService.setTwoFactorAuthenticationSecret(secret, user.id)

        return {
            secret,
            otpauthUrl,
        }
    }

    async findUser(ft_id: number): Promise<any> {
        let user = await this.userService.findOne(ft_id)
        return user
    }

    async generateQrCodeDataURL(otpAuthUrl: string) {
        return toDataURL(otpAuthUrl)
    }

    isTwoFactorAuthenticationCodeValid(
        twoFactorAuthenticationCode: string,
        User: User
    ) {
        return authenticator.verify({
            token: twoFactorAuthenticationCode,
            secret: User.TFASecret,
        })
    }

    // async loginWith2fa(user: Partial<User>) {
    //     const payload = {
    //         isTwoFactorAuthenticationEnabled:
    //             !!user.isTwoFactorAuthenticationEnabled,
    //         isTwoFactorAuthenticated: true,
    //     }

    //     return {
    //         access_token: this.jwtService.sign(payload),
    //     }
    // }
}
