import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-oauth2'
import { UserService } from 'src/user/user.service'

@Injectable()
export class Auth42Strategy extends PassportStrategy(Strategy, 'oauth') {
    constructor(private userService: UserService) {
        super({
            authorizationURL: 'https://api.intra.42.fr/oauth/authorize',
            tokenURL: 'https://api.intra.42.fr/oauth/token',
            clientID: process.env.FT_UUID,
            clientSecret: process.env.FT_SECRET,
            callbackURL: 'http://localhost:8080/api/auth/42/redirect',
        })
    }

    async validate(
        accessToken: string,
        profile: any,
        done: Function
    ): Promise<any> {
        console.log('default profile: ', profile)
        const user_profile = await this.getUserProfile(accessToken)
        if (!user_profile) {
            throw new UnauthorizedException()
        }
        console.log("API TOKEN FUNCTIONAL, 42 id: ", user_profile.id);

		let user = await this.userService.create({
			login: "titfddxdfsddfs",
			avatarUrl: "https://cdn.intra.42.fr/users/8064d076cacd8605b412baca23d88b3b/epresa-c.jpg",
			nbVictory: 32,
			totalPlay: 42,
			xp: 99,
			TFASecret: "99999",
			TFAEnabled: false,
		})

		console.log(user)

		return user
    }

    private async getUserProfile(accessToken: string): Promise<any> {
        const res = await fetch('https://api.intra.42.fr/v2/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })

        console.log(`Response status: ${res.status}`)

        if (!res.ok) {
            throw new Error(
                'Failed to fetch user profile from 42 API: ${res.status}'
            )
        }

        return await res.json()
    }
}
