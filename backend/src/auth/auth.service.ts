import { Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async validateUser(FT_id: string, name: string, avatarUrl: string) {
        const existing_user = await this.userService.findByFT_id(FT_id);
        if (existing_user) {
            return existing_user;
        } else
            return await this.userService.create({ 
                FT_id, 
                nickname: name, 
                avatarUrl
            });
    }
}
