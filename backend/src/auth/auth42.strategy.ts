import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-oauth2';
import { AuthService } from './auth.service';
import { access } from 'fs/promises';

@Injectable()
export class Auth42Strategy extends PassportStrategy(Strategy, '42') {
  constructor(private authService: AuthService) {
    super({
      authorizationURL: 'https://api.intra.42.fr/oauth/authorize',
      tokenURL: 'https://api.intra.42.fr/oauth/token',
      clientID: process.env.FORTYTWO_APP_ID,
      clientSecret: process.env.FORTYTWO_APP_SECRET,
      callbackURL: 'http://localhost:8080/api/auth/42/redirect'
    });
  }

  async validate(accessToken: string, profile: any, done: Function): Promise<any> {
    // create new user if he doesn't exist, generate JWT etc
    const user_profile = await this.getUserProfile(accessToken);
    if (!user_profile) {
      throw new UnauthorizedException();
    }
    // console.log(user_profile); remove after debugging
    return user_profile;
  }
  
  private async getUserProfile(accessToken: string): Promise<any> {
        const res = await fetch('https://api.intra.42.fr/v2/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        console.log(`Response status: ${res.status}`);
        // console.log(`Response body: ${await res.text()}`);

        if (!res.ok) {
            throw new Error('Failed to fetch user profile from 42 API: ${res.status}');
        }

        return await res.json();
    }
}


