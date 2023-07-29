import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
} from '@nestjs/websockets'
import { ChatService } from './chat.service'
import { Server } from 'socket.io'
import { CreateMessageDto } from 'src/message/dto/create-message.dto'
import { CreateChannelDto } from 'src/channel/dto/create-channel.dto'
import { UsePipes, ValidationPipe, Request } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { WebSocketServer } from '@nestjs/websockets'
import { User } from 'src/typeorm/user.entity'

@WebSocketGateway({
    cors: {
        origin: '*',
    },
    // methods: ['GET', 'POST'],
    // allowedHeaders: ['Content-Type', 'Authorization'],
    // credentials: true,
})
export class ChatGateway {
    constructor(
        private readonly chatService: ChatService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    @WebSocketServer()
    server: Server

    @SubscribeMessage('postMsg')
    @UsePipes(ValidationPipe)
    async postMsg(@MessageBody() createMessageDto: CreateMessageDto) {
        console.log(createMessageDto)
        const user = await this.userRepository.findOneBy({
            id: createMessageDto.creator,
        })
        const { nickname, avatarUrl } = user
        createMessageDto.userNickname = nickname
        createMessageDto.userAvatarUrl = avatarUrl
        const msgSended = await this.chatService.newMsg(createMessageDto)
        this.server.emit('incomingMessage', msgSended)
    }

    @SubscribeMessage('findAllMsgByChannel')
    async findAllMsgByChannel(
        @MessageBody() channelId: number,
        @Request() req: any
    ) {
        const chanAllMsgs = await this.chatService.findAllMsgByChannel(
            channelId
        )
        return chanAllMsgs
    }

    //UserBox UserBox UserBox UserBox UserBox UserBox UserBox UserBox UserBox UserBox
    @SubscribeMessage('findUsersByChannel')
    async findAllUsersByChannel(@MessageBody() channelId: number) {
        const chanUsers = await this.chatService.findUsersByChannel(channelId)
        return chanUsers
    }

    @SubscribeMessage('blockUser')
    async blockUser(@MessageBody() data: any) {
        try {
            this.chatService.blockUser(data[0], data[1])
            return { message: 'User blocked successfully' }
        } catch (error) {
            throw new Error('Failed to block user')
        }
    }

    @SubscribeMessage('unblockUser')
    async unblockUser(@MessageBody() data: any) {
        try {
            console.log('LA VIE EST BELLE')
            this.chatService.unblockUser(data[0], data[1])
            return { message: 'User unblocked successfully' }
        } catch (error) {
            throw new Error('Failed to unblock user')
        }
    }

    @SubscribeMessage('getBlockedUsers')
    async getBlockedUsers(@MessageBody() myId: number) {
        try {
            const blockedUsers = await this.chatService.getBlockedUsers(myId)
            // this.server.emit('updateUsers', msgSended)
            return blockedUsers
        } catch (error) {
            throw new Error('Failed to get blocked users')
        }
    }

    @SubscribeMessage('setAdmin')
    async setAdmin(@MessageBody() data: any) {
        try {
            this.chatService.setAdmin(data[0], data[1], data[2])
            return { message: 'User is now admin' }
        } catch (error) {
            throw new Error('Failed to set admin')
        }
    }

    @SubscribeMessage('unsetAdmin')
    async unsetAdmin(@MessageBody() data: any) {
        try {
            this.chatService.unsetAdmin(data[0], data[1], data[2])
            return { message: 'User it is no longer admin' }
        } catch (error) {
            throw new Error('Failed to unset admin')
        }
    }

    @SubscribeMessage('kickUser')
    async kickUser(@MessageBody() data: any) {
        try {
            this.chatService.kickUser(data[0], data[1], data[2])
            return { message: 'User kicked successfully' }
        } catch (error) {
            throw new Error('Failed to kick user')
        }
    }

    @SubscribeMessage('banUser')
    async banUser(@MessageBody() data: any) {
        try {
            this.chatService.banUser(data[0], data[1], data[2])
            return { message: 'User banned successfully' }
        } catch (error) {
            throw new Error('Failed to ban user')
        }
    }

    @SubscribeMessage('unbanUser')
    async unbanUser(@MessageBody() data: any) {
        try {
            this.chatService.unbanUser(data[0], data[1], data[2])
            return { message: 'User unbanned successfully' }
        } catch (error) {
            throw new Error('Failed to unban user')
        }
    }

    @SubscribeMessage('getBannedUsers')
    async getBannedUsers(@MessageBody() channelId: number) {
        try {
            const bannedUsers = await this.chatService.getBannedUsers(channelId)
            return bannedUsers
        } catch (error) {
            throw new Error('Failed to get banned users')
        }
    }

    @SubscribeMessage('muteUser')
    async muteUser(@MessageBody() data: any) {
        try {
            this.chatService.muteUser(data[0], data[1], data[2])
            return { message: 'User muted successfully' }
        } catch (error) {
            throw new Error('Failed to mute user')
        }
    }

    @SubscribeMessage('getMutedUsers')
    async getMutedUsers(@MessageBody() channelId: number) {
        try {
            const mutedUsers = await this.chatService.getMutedUsers(channelId)
            return mutedUsers
        } catch (error) {
            throw new Error('Failed to get muted users')
        }
    }

    //ChannelBox ChannelBox ChannelBox ChannelBox ChannelBox ChannelBox ChannelBox ChannelBox ChannelBox ChannelBox
    @SubscribeMessage('createNewChannel')
    @UsePipes(ValidationPipe)
    async createChannel(@MessageBody() createChannelDto: CreateChannelDto) {
        const user = await this.userRepository.findOneBy({
            id: createChannelDto.ownerId,
        })
        // Check if password is not empty
        // if yes crypto the password
        createChannelDto.owner = user
        createChannelDto.admin = [user]
        createChannelDto.users = [user]
        createChannelDto.messages = []
        const channelCreated = await this.chatService.createChannel(
            createChannelDto
        )
        this.server.emit('newChannel', channelCreated)
        return channelCreated
    }

    @SubscribeMessage('createDM')
    @UsePipes(ValidationPipe)
    async createDirectChannel(@MessageBody() body: any) {
        const createChannelDto = new CreateChannelDto()
        const user = await this.userRepository.findOneBy({
            id: body[0],
        })

        const user2 = await this.userRepository.findOneBy({
            id: body[1],
        })
        const channel = await this.chatService.findChanDM(
            user.nickname,
            user2.nickname
        )
        if (channel) {
            const joinChannel = await this.chatService.joinChannel(
                channel.id,
                +body[0],
                ''
            )
            if (joinChannel) this.server.emit('newChannel', joinChannel)
            return joinChannel.id
        }
        createChannelDto.owner = user
        createChannelDto.admin = [user]
        createChannelDto.users = [user, user2]
        createChannelDto.type = 'direct'
        createChannelDto.name = user.nickname + ' & ' + user2.nickname
        createChannelDto.password = ''

        const channelCreated = await this.chatService.createChannel(
            createChannelDto
        )
        if (channelCreated) {
            this.server.emit('newChannel', channelCreated)
            return channelCreated
        } else {
            return null
        }
    }

    @SubscribeMessage('getAllChannels')
    @UsePipes(ValidationPipe)
    async getAllChannels() {
        const channels = await this.chatService.getAllChannels()
        return channels
    }

    @SubscribeMessage('joinChannel')
    async joinChannel(@MessageBody() data: any) {
        console.log('data', data)
        try {
            const channel = await this.chatService.joinChannel(
                data[0],
                data[1],
                data[2]
            )
            return channel
        } catch (error) {
            throw new Error('Failed to join Channel')
        }
    }

    @SubscribeMessage('leaveChannel')
    async leaveChannel(@MessageBody() data: any) {
        try {
            console.log('data leave', data)
            const channel = await this.chatService.leaveChannel(
                data[0],
                data[1]
            )
            // return { message: 'User removed from channel successfully' }
            return channel
        } catch (error) {
            throw new Error('Failed to remove user from channel')
        }
    }
    @SubscribeMessage('deleteChannel')
    async deleteChannel(@MessageBody() data: any) {
        try {
            const channel = await this.chatService.deleteChannel(
                data[0],
                data[1]
            )
            return channel
        } catch (error) {
            throw new Error('Failed to remove user from channel')
        }
    }

    @SubscribeMessage('changePassword')
    @UsePipes(ValidationPipe)
    async changeChannelPassword(@MessageBody() data: any) {
        return await this.chatService.changePassword(data[0], data[1])
    }
}
