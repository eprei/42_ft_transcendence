import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-totp'
import { UserService } from 'src/user/user.service'
@Injectable()
export class totpStrategy extends PassportStrategy(Strategy, 'totp') {
    constructor(private readonly userService: UserService) {
        super({})
    }
    async validate(payload: any) {
        // 	const user = await this.authService.findUser(ft_data.id);
        //     if (user) {
        //         return user.id;
        //     }
        // 	if (!user.isTwoFactorAuthenticationEnabled) {
        // 	  return user;
        // 	}
        // 	if (payload.isTwoFactorAuthenticated) {
        // 	  return user;
        // 	}
        // }
        // TODO CONTINUE HERE
    }
}
