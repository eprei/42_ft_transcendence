import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-oauth2'

@Injectable()
export class Auth42Strategy extends PassportStrategy(Strategy, 'oauth') {
    constructor() {
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
        const user_profile = await this.getUserProfile(accessToken);
        if (!user_profile) {
          throw new UnauthorizedException();
        }
        console.log("API TOKEN FUNCTIONAL, 42 id: ", user_profile.id);
        return user_profile.id
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
