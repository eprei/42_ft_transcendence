import {
    Injectable,
    NotFoundException,
    Request,
    Param,
    UnauthorizedException,
    Req,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/typeorm/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { Repository } from 'typeorm'
import { UpdateUserDto } from './dto/update-user.dto'
import { UpdateNicknameDto } from './dto/update-nickname.dto'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}
    create(createUserDto: CreateUserDto) {
        const user = this.userRepository.create(createUserDto)
        return this.userRepository.save(user)
    }

    findAll() {
        return this.userRepository.find()
    }

    findOne(id: number) {
        return this.userRepository.findOneBy({ id: id })
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const user = await this.findOne(id)
        return this.userRepository.save({ ...user, ...updateUserDto })
    }

    async remove(id: number) {
        const user = await this.findOne(id)
        return this.userRepository.remove(user)
    }

    findByFT_id(FT_id: string) {
        return this.userRepository.findOneBy({ FT_id: FT_id })
    }

    findByNickname(nickname: string): Promise<User | undefined> {
        return new Promise((resolve, reject) => {
            try {
                const user = this.userRepository.findOneBy({
                    nickname: nickname,
                })

                if (user) {
                    console.log('User found:', user)
                    resolve(user)
                } else {
                    console.log('No user with the nickname provided was found.')
                    resolve(undefined)
                }
            } catch (error) {
                console.error('Error when searching for the user: ', error)
                reject(error)
            }
        })
    }

    async getUserRankingPosition(userId: number): Promise<number> {
        const user = await this.findOne(userId)
        if (!user) {
            throw new NotFoundException('User not found')
        }

        const userPosition = await this.userRepository
            .createQueryBuilder('user')
            .where('user.xp >= :userXp', { userXp: user.xp })
            .getCount()
        return userPosition
    }

    async setTwoFactorAuthenticationSecret(secret: string, userID: number) {
        const user = await this.userRepository.findOne({
            where: { id: userID },
        })

        if (user) {
            user.TFASecret = secret
            return this.userRepository.save(user)
        }
        throw new Error(`User with id ${userID} not found`)
    }

    async turnOnTwoFactorAuthentication(userID: number) {
        const user = await this.userRepository.findOne({
            where: { id: userID },
        })

        if (user) {
            user.TFAEnabled = true
            return this.userRepository.save(user)
        }
        throw new Error(`User with id ${userID} not found`)
    }

    async turnOffTwoFactorAuthentication(userID: number) {
        const user = await this.userRepository.findOne({
            where: { id: userID },
        })

        if (user) {
            user.TFAEnabled = false
            return this.userRepository.save(user)
        }
        throw new Error(`User with id ${userID} not found`)
    }

    async getLambdaInfo(@Param('nickname') nickname: string) {
        const user = await this.findByNickname(nickname)

        if (!user) {
            throw new NotFoundException('User not found')
        }

        const { id, TFASecret, FT_id, ...rest } = user
        const userPosition = await this.getUserRankingPosition(user.id)

        return { ...rest, userPosition }
    }

    async updateNickname(
        @Request() req: any,
        updateNicknameDto: UpdateNicknameDto
    ) {
        const user = await this.findOne(req.user.id)
        if (!user) {
            throw new NotFoundException('User not found')
        }

        const { nickname } = updateNicknameDto

        if ((await this.findByNickname(nickname)) != undefined)
            throw new UnauthorizedException('Nickname not available')

        try {
            const updateUserDto: UpdateUserDto = {
                id: user.id,
                nickname: nickname,
            }

            this.update(user.id, updateUserDto)

            return { message: 'Nickname updated successfully' }
        } catch (error) {
            return { error: 'Failed to update nickname' }
        }
    }

    logStatus(@Req() req) {
        console.log(
            'user.service: req.session.needTFA  = ',
            req.session.needTFA
        )
        if (req.user && req.session.needTFA === false) {
            console.log('user.service: is logged')
            return { status: 'isLogged' }
        } else if (req.user && req.session.needTFA === true) {
            console.log('user.service: need2fa')
            return { status: 'need2fa' }
        } else {
            console.log('user.service: not autenticated')
            return { status: 'error', message: 'Not authenticated' }
        }
    }
}
