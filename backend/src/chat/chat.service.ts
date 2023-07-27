import { Injectable } from '@nestjs/common'
import { CreateMessageDto } from '../message/dto/create-message.dto'
import { CreateChannelDto } from '../channel/dto/create-channel.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Message } from 'src/typeorm/message.entity'
import { Channel } from 'src/typeorm/channel.entity'
import { User } from 'src/typeorm/user.entity'
import { Repository } from 'typeorm'
import { NotFoundException, UnauthorizedException } from '@nestjs/common'

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
        @InjectRepository(Channel)
        private readonly channelRepository: Repository<Channel>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    //ChatBox ChatBox ChatBox ChatBox ChatBox ChatBox ChatBox ChatBox ChatBox ChatBox
    async newMsg(createMessageDto: CreateMessageDto) {
        const newMessage = this.messageRepository.create(createMessageDto)
        const savedMessage = await this.messageRepository.save(newMessage)
        return savedMessage
    }

    async findOneToDisplay(id: number) {
        const message = await this.messageRepository
            .createQueryBuilder('message')
            .select([
                'message.id',
                'message.content',
                'user.nickname',
                'user.avatarUrl',
            ])
            .where('message.id = :id', { id })
            .getOne()
        return message
    }

    async findAllMsgByChannel(channelId: number): Promise<Message[]> {
        const messages = await this.messageRepository
            .createQueryBuilder('message')
            .where('message.channelId = :channelId', { channelId })
            .getMany()

        return messages
    }

    //UserBox UserBox UserBox UserBox UserBox UserBox UserBox UserBox UserBox UserBox
    async findUsersByChannel(id: number) {
        return await this.channelRepository.findOne({
            relations: {
                users: true,
                owner: true,
                admin: true,
				banned: true,
            },
            where: { id: id },
        })
    }

    async blockUser(myId: number, hisId: number) {
        const user = await this.userRepository.findOne({
            where: { id: myId },
            relations: {
                blockedUsers: true,
            },
        })
        console.log('user', user)
        const userToBlock = await this.userRepository.findOne({
            where: { id: hisId },
            relations: {
                blockedBy: true,
            },
        })
        console.log('userToBlock', userToBlock)

        userToBlock.blockedBy.push(user)
        await this.userRepository.save(userToBlock)

        user.blockedUsers.push(userToBlock)
        await this.userRepository.save(user)

        const direcChan = this.findChanDM(
            user.nickname,
            userToBlock.nickname
        ).then((channel) => {
            if (channel) {
                return this.channelRepository.remove(channel)
                // this.leaveChannel(channel.id, user.id)
                // this.leaveChannel(channel.id, userToBlock.id)
            }
        })
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

	async getBlockedUsers(myId: number)
	{
		const user = await this.userRepository.findOne({
			where: { id: myId },
			relations: {
				blockedUsers: true,
			},
		})
		const blockedUserIds = user.blockedUsers.map((blockedUser) => blockedUser.id)
		console.log(blockedUserIds)
		return blockedUserIds
	}

	async setAdmin(myId: number, hisId: number, channelId: number) {
		const channel = await this.channelRepository.findOne({
			where: { id: channelId },
			relations: {
				owner: true,
				admin: true,
			},
		})
		const user = await this.userRepository.findOne({
			where: { id: myId }
		})
		
		const userToSet = await this.userRepository.findOne({
			where: { id: hisId }
		})

		if (channel.owner.id === user.id) {
			channel.admin.push(userToSet)
			await this.channelRepository.save(channel)
		}
		else
			throw new UnauthorizedException()
	}

	async unsetAdmin(myId: number, hisId: number, channelId: number) {
		const channel = await this.channelRepository.findOne({
			where: { id: channelId },
			relations: {
				owner: true,
				admin: true,
			},
		})
		const user = await this.userRepository.findOne({
			where: { id: myId }
		})
		
		const userToUnset = await this.userRepository.findOne({
			where: { id: hisId }
		})

		if (channel.owner.id === user.id) {
			channel.admin = channel.admin.filter((u) => u.id !== userToUnset.id)
			await this.channelRepository.save(channel)
		}
		else
			throw new UnauthorizedException()
	}

	async kickUser(myId: number, hisId: number, channelId: number) {
		const channel = await this.channelRepository.findOne({
			where: { id: channelId },
			relations: {
				owner: true,
				admin: true,
				users: true,
			},
		})
		
		const user = await this.userRepository.findOne({
			where: { id: myId }
		})
		
		const userToKick = await this.userRepository.findOne({
			where: { id: hisId }
		})

		if (channel.owner.id !== userToKick.id && channel.admin.some((u) => u.id === user.id)) {
			channel.users = channel.users.filter((u) => u.id !== userToKick.id)
			await this.channelRepository.save(channel)
		}
		else
			throw new UnauthorizedException()
	}

	async banUser(myId: number, hisId: number, channelId: number) {
		const channel = await this.channelRepository.findOne({
			where: { id: channelId },
			relations: {
				owner: true,
				admin: true,
				users: true,
				banned: true
			},
		})
		
		const user = await this.userRepository.findOne({
			where: { id: myId }
		})
		
		const userToBan = await this.userRepository.findOne({
			where: { id: hisId }
		})

		if (channel.owner.id !== userToBan.id && channel.admin.some((u) => u.id === user.id)) {
			channel.banned.push(userToBan)
			channel.users = channel.users.filter((u) => u.id !== userToBan.id)
			channel.admin = channel.admin.filter((u) => u.id !== userToBan.id)
			await this.channelRepository.save(channel)
		}
		else
			throw new UnauthorizedException()
	}

	async unbanUser(myId: number, hisId: number, channelId: number) {
		const channel = await this.channelRepository.findOne({
			where: { id: channelId },
			relations: {
				admin: true,
				users: true,
				banned: true
			},
		})
		
		const user = await this.userRepository.findOne({
			where: { id: myId }
		})
		
		const userToUnban = await this.userRepository.findOne({
			where: { id: hisId }
		})

		if (channel.admin.some((u) => u.id === user.id)) {
			channel.banned = channel.banned.filter((u) => u.id !== userToUnban.id)
			await this.channelRepository.save(channel)
		}
		else
			throw new UnauthorizedException()
	}

	async getBannedUsers(channelId: number)	{
		const channel = await this.channelRepository.findOne({
			where: { id: channelId },
			relations: {
				banned: true,
			},
		})
		const bannedUserIds = channel.banned.map((bannedUser) => bannedUser.id)
		console.log(bannedUserIds)
		return bannedUserIds
	}


    //ChannelBox ChannelBox ChannelBox ChannelBox ChannelBox ChannelBox ChannelBox ChannelBox ChannelBox ChannelBox
    createChannel(createChannelDto: CreateChannelDto) {
        console.log('createChannelDto', createChannelDto)
        const newChannel = this.channelRepository.create(createChannelDto)
        return this.channelRepository.save(newChannel)
    }

    async getAllChannels() {
        return await this.channelRepository.find({
            relations: ['users', 'admin', 'messages', 'owner'],
        })
    }

    async joinChannel(channelId: number, userId: number, password: string) {
        console.log('channelId', channelId)
        console.log('userId', userId)
        console.log('password', password)
        const channel = await this.channelRepository.findOne({
            relations: ['users', 'banned'],
            where: { id: channelId },
        })

        if (channel.password && channel.password !== password) {
            throw new UnauthorizedException()
        }
        const user = await this.userRepository.findOne({
            where: { id: userId },
        })
		if (channel.banned.some((u) => u.id === user.id)) {
			throw new UnauthorizedException()
		}
        if (channel.type === 'direct') {
            if (channel.users.length === 1) {
                channel.users.push(user)
            } else {
                //if (channel.users.length === 2 && channel.users[0].id !== user.id && channel.users[1].id !== user.id){
                console.log('channel is full')
                throw new UnauthorizedException()
            }
        } else channel.users.push(user)
        return await this.channelRepository.save(channel)
    }

    async leaveChannel(channelId: number, userId: number) {
        const channel = await this.channelRepository.findOne({
            relations: ['users'],
            where: { id: channelId },
        })
        const user = await this.userRepository.findOne({
            where: { id: userId },
        })
        channel.users = channel.users.filter((u) => u.id !== user.id)
        return await this.channelRepository.save(channel)
    }

    findChanDM(nick1: string, nick2: string): Promise<Channel | undefined> {
        return new Promise((resolve, reject) => {
            try {
                let chName = nick1 + ' & ' + nick2
                let channel = this.channelRepository.findOneBy({
                    name: chName,
                })
                if (channel) resolve(channel)
                else {
                    chName = nick2 + ' & ' + nick1
                    channel = this.channelRepository.findOneBy({
                        name: chName,
                    })
                    if (channel) resolve(channel)
                    else resolve(undefined)
                }
            } catch (error) {
                console.error('Error when searching for the channel: ', error)
                reject(error)
            }
        })
    }

    async deleteChannel(channelId: number, userId: number) {
        const channel = await this.channelRepository.findOne({
            where: { id: channelId },
        })
        if (!channel) {
            throw new NotFoundException('Channel not found')
        }

        const deleteChannel = await this.channelRepository.remove(channel)
        return deleteChannel
    }

    async changePassword(channelId: number, password: string) {
        try {
            const chan = await this.channelRepository.findOne({
                where: { id: channelId },
            })
            chan.password = password
            await this.channelRepository.update(channelId, chan)
            return true
        } catch (error) {
            return false
        }
    }
}
