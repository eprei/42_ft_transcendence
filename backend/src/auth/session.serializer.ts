import { PassportSerializer } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { UserService } from 'src/user/user.service'

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(private readonly userService: UserService) {
        super()
    }

    serializeUser(user: any, done: (err: Error, user: any) => void): any {
        done(null, user.id)
    }
    deserializeUser(payload: any, done: Function): any {
        this.userService
            .findOne(payload)
            .then((user) => {
                done(null, user)
            })
            .catch((err) => {
                done(err, null)
            })
    }
}
