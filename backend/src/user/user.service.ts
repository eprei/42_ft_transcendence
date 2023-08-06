import {
    Injectable,
    NotFoundException,
    Request,
    Param,
    UnauthorizedException,
    Req,
    BadRequestException,
    InternalServerErrorException,
    Res,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/typeorm/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { Repository, Not, In } from 'typeorm'
import { UpdateUserDto } from './dto/update-user.dto'
import { UpdateNicknameDto } from './dto/update-nickname.dto'
import { v4 as uuidv4 } from 'uuid'
import { extname, basename } from 'path'
import * as fs from 'fs'
import { FriendService } from 'src/friend/friend.service'
import { UserStatus } from 'src/typeorm/user.entity'
import { Friend } from 'src/typeorm/friend.entity'
import { Channel } from 'src/typeorm/channel.entity'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly friendService: FriendService,
        @InjectRepository(Friend)
        private readonly friendRepository: Repository<Friend>,
        @InjectRepository(Channel)
        private readonly channelRepository: Repository<Channel>
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

    async findByNickname(nickname: string) {
        try {
            const user = await this.userRepository.findOneBy({
                nickname: nickname,
            })

            if (!user) {
                console.log('No user with the nickname provided was found.')
            }
            return user
        } catch (error) {
            console.error('Error when searching for the user: ', error)
        }
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

        const { TFASecret, FT_id, ...rest } = user
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
        if (req.user && req.session.needTFA === false) {
            return { status: 'isLogged' }
        } else if (req.user && req.session.needTFA === true) {
            return { status: 'need2fa' }
        } else {
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

        const uniqueSuffix = uuidv4()
        const fileExt = extname(file.originalname)
        const fileNameWithoutExtAndSpaces = basename(
            file.originalname,
            fileExt
        ).replace(/\s+/g, '_')
        const uniqueFilename = `${fileNameWithoutExtAndSpaces}${uniqueSuffix}${fileExt}`

        try {
            // Read temporary file
            const fileData = fs.readFileSync(file.path)

            // Write the file to the path of the volume 'profile-images'.
            fs.writeFileSync(`${destinationPath}/${uniqueFilename}`, fileData)

            // Delete temporary file
            fs.unlinkSync(file.path)

            // Construct the URL for the photo on our server
            const serverBaseUrl = `${process.env.URL_BACKEND}/api/user` // Profile's pictures base URL
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

    async getMyInfo(@Request() req: any) {
        const user = await this.findOne(req.user.id)

        if (!user) {
            throw new NotFoundException('User not found')
        }

        const { TFASecret, FT_id, ...rest } = user

        const userPosition = await this.getUserRankingPosition(req.user.id)

        return { ...rest, userPosition }
    }

    async getFriendsAndRequests(@Request() req: any) {
        const user = await this.findOne(req.user.id)

        if (!user) {
            throw new NotFoundException('User not found')
        }

        return this.friendService.getFiendsAndRequests(user.id)
    }

    async getAllUsersWithNoFriendship(@Request() req: any) {
        const user = await this.findOne(req.user.id)

        if (!user) {
            throw new NotFoundException('User not found')
        }

        const userId: number = user.id

        const friendsAddedByMe = await this.friendRepository
            .createQueryBuilder('friend')
            .select('friend.friendId', 'friendId')
            .where('friend.userId = :userId', { userId })
            .getRawMany()

        const friendsWhoAddedMe = await this.friendRepository
            .createQueryBuilder('follower')
            .select('follower.userId', 'userId')
            .where('follower.friendId = :userId', { userId })
            .getRawMany()

        const friendsByMeIds = friendsAddedByMe.map((friend) => friend.friendId)

        const friendsByOthersIds = friendsWhoAddedMe.map(
            (follower) => follower.userId
        )

        const usersNotFriends = await this.userRepository.find({
            where: {
                id: Not(In([...friendsByMeIds, ...friendsByOthersIds, userId])),
            },
            select: ['id', 'nickname', 'avatarUrl'],
        })

        return { usersNotFriends }
    }

    async logout(@Request() req: any, @Res() res: any) {
        const user = await this.findOne(req.user.id)

        if (!user) {
            throw new NotFoundException('User not found')
        }
        this.update(user.id, { id: user.id, status: UserStatus.Offline })

        await req.session.destroy()
        res.clearCookie('sessionID')
        res.status(200).json({ message: 'Logout successful' })
    }

    async changeStatusOnLine(userId: number) {
        const user = await this.findOne(userId)

        if (user && user.status != UserStatus.Online)
            this.update(userId, { id: userId, status: UserStatus.Online })
    }

    async changeStatusPlaying(userId: number) {
        const user = await this.findOne(userId)

        if (user && user.status != UserStatus.Playing)
            this.update(userId, { id: userId, status: UserStatus.Playing })
    }

    async isBlockedByMe(@Request() req: any, target_id: number) {
        const user = await this.userRepository.findOne({
            where: { id: req.user.id },
            relations: {
                blockedUsers: true,
            },
        })
        if (user.blockedUsers.some((u) => u.id === target_id)) return true
        else return false
    }

    async blockUser(monId: number, targetId: number) {
        const user = await this.userRepository.findOne({
            where: { id: monId },
            relations: {
                blockedUsers: true,
            },
        })
        const userToBlock = await this.userRepository.findOne({
            where: { id: targetId },
            relations: {
                blockedBy: true,
            },
        })

        userToBlock.blockedBy.push(user)
        await this.userRepository.save(userToBlock)

        user.blockedUsers.push(userToBlock)
        await this.userRepository.save(user)

        //erase DM if exist
        let channelName = user.nickname + ' & ' + userToBlock.nickname
        let DM = await this.channelRepository.findOne({
            where: { name: channelName },
        })
        if (!DM) {
            channelName = userToBlock.nickname + ' & ' + user.nickname
            let DM = await this.channelRepository.findOne({
                where: { name: channelName },
            })
        }

        if (DM) {
            await this.channelRepository.remove(DM)
        }
    }

    async unblockUser(myId: number, hisId: number) {
        const user = await this.userRepository.findOne({
            where: { id: myId },
            relations: {
                blockedUsers: true,
            },
        })

        const userToUnblock = await this.userRepository.findOne({
            where: { id: hisId },
            relations: {
                blockedBy: true,
            },
        })

        userToUnblock.blockedBy = userToUnblock.blockedBy.filter(
            (u) => u.id !== user.id
        )
        await this.userRepository.save(userToUnblock)

        user.blockedUsers = user.blockedUsers.filter(
            (u) => u.id !== userToUnblock.id
        )
        await this.userRepository.save(user)
    }
}
