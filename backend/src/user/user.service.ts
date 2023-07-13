import {
    Injectable,
    NotFoundException,
    Request,
    Param,
    UnauthorizedException,
    Req,
    BadRequestException,
    InternalServerErrorException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/typeorm/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { Repository } from 'typeorm'
import { UpdateUserDto } from './dto/update-user.dto'
import { UpdateNicknameDto } from './dto/update-nickname.dto'
import { v4 as uuidv4 } from 'uuid'
import { extname } from 'path'
import * as fs from 'fs'

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

    async uploadProfilePicture(
        @Request() req: any,
        file: Express.Multer.File
    ): Promise<string> {
        if (!file) {
            throw new BadRequestException('No image was provided')
        }

        // Destination path in the 'profile-images' volume
        const destinationPath = '/app/profile-images'

        // Generate a unique name for the file in the volume 'profile-images'
        const uniqueFilename = `${uuidv4()}${extname(file.originalname)}`

        try {
            // Read temporary file
            const fileData = fs.readFileSync(file.path)

            // Write the file to the path of the volume 'profile-images'.
            fs.writeFileSync(`${destinationPath}/${uniqueFilename}`, fileData)

            // Delete temporary file
            fs.unlinkSync(file.path)

            // Construct the URL for the photo on our server
            const serverBaseUrl = 'http://localhost:8080/api/user' // Profile's pictures base URL
            const photoUrl: string = `${serverBaseUrl}/profile-images/${uniqueFilename}`

            // Get the current user from the database
            const user = await this.findOne(req.user.id)
            if (!user) {
                throw new NotFoundException('User not found')
            }

            const updateUserDto: UpdateUserDto = {
                id: user.id,
                avatarUrl: photoUrl,
            }

            await this.update(user.id, updateUserDto)

            return photoUrl
        } catch (error) {
            // Error handling if a problem occurs while reading, writing, or deleting the file
            console.error('Error when moving profile image:', error)
            throw new InternalServerErrorException(
                'An error occurred when saving the profile image'
            )
        }
    }
}
