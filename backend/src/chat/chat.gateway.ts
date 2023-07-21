import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
} from '@nestjs/websockets'
import { ChatService } from './chat.service'
import { Server, Socket } from 'socket.io'
import { CreateMessageDto } from 'src/message/dto/create-message.dto'
import { CreateChannelDto } from 'src/channel/dto/create-channel.dto'
import {
    UsePipes,
    ValidationPipe,
    Post,
    Body,
    Param,
    Inject,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Channel } from 'src/typeorm/channel.entity'
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
    @WebSocketServer()
    server: Server

    constructor(
        private readonly chatService: ChatService,
        @InjectRepository(Channel)
        private readonly channelRepository: Repository<Channel>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    @SubscribeMessage('Hello')
    hello() {
        console.log('Hello my friend')
        return 'Hello'
    }

    //ChatBox ChatBox ChatBox ChatBox ChatBox ChatBox ChatBox ChatBox ChatBox ChatBox
    @SubscribeMessage('postMsg')
    @UsePipes(ValidationPipe)
    async postMsg(@MessageBody() createMessageDto: CreateMessageDto) {
        const chan = await this.channelRepository.findOneBy({
            id: createMessageDto.chanId,
        })
        ;(createMessageDto.creationDate = new Date()),
            (createMessageDto.channel = chan)
        const msgSended = await this.chatService.newMsg(createMessageDto)
        if (msgSended) {
            this.server.emit('incomingMessage', msgSended)
            return msgSended
        } else {
            return null
        }
    }

    @SubscribeMessage('findAllMsgByChannel')
    async findAllMsgByChannel(@MessageBody() channelId: number) {
        const chanMsg = await this.chatService.findAllMsgByChannel(channelId)
        return chanMsg
    }

    //UserBox UserBox UserBox UserBox UserBox UserBox UserBox UserBox UserBox UserBox
    @SubscribeMessage('findUsersByChannel')
    async findAllUsersByChannel(@MessageBody() channelId: number) {
        const chanUsers = await this.chatService.findUsersByChannel(channelId)
        return chanUsers
    }

    //ChannelBox ChannelBox ChannelBox ChannelBox ChannelBox ChannelBox ChannelBox ChannelBox ChannelBox ChannelBox
    @SubscribeMessage('createNewChannel')
    @UsePipes(ValidationPipe)
    async createChannel(@MessageBody() createChannelDto: CreateChannelDto) {
        const user = await this.userRepository.findOneBy({
            id: createChannelDto.ownerId,
        })
        createChannelDto.owner = user
        createChannelDto.admin = user
        createChannelDto.users = [user]
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
        createChannelDto.admin = user
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
        const channel = await this.chatService.joinChannel(
            data[0],
            data[1],
            data[2]
        )
        return channel
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
}
