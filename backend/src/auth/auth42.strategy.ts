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
      callbackURL: 'http://localhost:8080/api/auth/42/redirect',
      passReqToCallback: true
    });
  }

  async validate(accessToken: string, profile: any, done: Function): Promise<any> {
    // create new user if he doesn't exist, generate JWT etc
    console.log("default profile: ", profile);
    // const user_profile = await this.getUserProfile(accessToken);
    // if (!profile {
    //   throw new UnauthorizedException();
    // }
    // console.log(user_profile); remove after debugging
    // console.log("User Profile: ", user_profile.id);
    return profile;
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


