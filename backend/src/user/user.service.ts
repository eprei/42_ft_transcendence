import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/typeorm/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { Repository } from 'typeorm'
import { UpdateUserDto } from './dto/update-user.dto'

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
}
