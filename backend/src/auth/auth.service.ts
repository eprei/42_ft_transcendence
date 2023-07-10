import { Injectable } from '@nestjs/common'
import { User } from 'src/typeorm/user.entity'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async validateUser(user42) {
        console.log(`avatarUrl: ${user42.avatarUrl}`);
        let user = await this.userService.findByFT_id(user42.FT_id)
        console.log(`User FOUND IN DB ${user}`)
        if (!user) {
            user = await this.userService.create({
                FT_id: user42.FT_id,
                nickname: user42.nickname,
                avatarUrl: user42.avatarUrl,
            })
            console.log(`User NOT FOUND IN DB ${user}`)
        }
        return user
    }
}
