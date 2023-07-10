import { Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async validateUser(user42) {
        let user = await this.userService.findByFT_id(user42.FT_id)
        if (!user) {
            user = await this.userService.create({
                FT_id: user42.FT_id,
                nickname: user42.nickname,
                avatarUrl: user42.avatarUrl,
            })
        }
        return user
    }
}
