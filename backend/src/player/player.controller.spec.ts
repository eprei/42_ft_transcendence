import { Test, TestingModule } from '@nestjs/testing'
import { PlayerController } from './player.controller'
import { PlayerService } from './player.service'
import { CreatePlayerDto } from './dto/create-player.dto'
import { UpdatePlayerDto } from './dto/update-player.dto'
import { Player } from '../typeorm/player.entity'

describe('PlayerController', () => {
    let controller: PlayerController
    let service: PlayerService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PlayerController],
            providers: [PlayerService],
        }).compile()

        controller = module.get<PlayerController>(PlayerController)
        service = module.get<PlayerService>(PlayerService)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })

    describe('create', () => {
        it('should create a new player', async () => {
            const createPlayerDto: CreatePlayerDto = {
                login: 'examplePlayer',
                avatarUrl: 'http://example.com/avatar.jpg',
            }

            const createdPlayer: Player = {
                id: 1,
                login: 'examplePlayer',
                avatarUrl: 'http://example.com/avatar.jpg',
                nbVictory: 0,
                totalPlay: 0,
                xp: 0,
                TFASecret: '',
                TFAEnabled: false,
                FT_id: '',
                channels: [],
                friends: [],
                friendOf: [],
                homeMatches: [],
                foreignMatches: [],
                wonMatches: [],
            }

            jest.spyOn(service, 'create').mockResolvedValue(createdPlayer)

            const result = await controller.create(createPlayerDto)

            expect(result).toEqual(createdPlayer)
        })
    })

    describe('findAll', () => {
        it('should return an array of players', async () => {
            const players: Player[] = [
                {
                    id: 1,
                    login: 'player1',
                    avatarUrl: 'http://example.com/avatar1.jpg',
                    nbVictory: 0,
                    totalPlay: 0,
                    xp: 0,
                    TFASecret: '',
                    TFAEnabled: false,
                    FT_id: '',
                    channels: [],
                    friends: [],
                    friendOf: [],
                    homeMatches: [],
                    foreignMatches: [],
                    wonMatches: [],
                },
                {
                    id: 2,
                    login: 'player2',
                    avatarUrl: 'http://example.com/avatar2.jpg',
                    nbVictory: 2,
                    totalPlay: 5,
                    xp: 100,
                    TFASecret: 'secret',
                    TFAEnabled: true,
                    FT_id: 'ftid',
                    channels: [],
                    friends: [],
                    friendOf: [],
                    homeMatches: [],
                    foreignMatches: [],
                    wonMatches: [],
                },
            ]

            jest.spyOn(service, 'findAll').mockResolvedValue(players)

            const result = await controller.findAll()

            expect(result).toEqual(players)
        })
    })

    describe('findOne', () => {
        it('should return a player with the given id', async () => {
            const playerId = '1'
            const player: Player = {
                id: 1,
                login: 'player1',
                avatarUrl: 'http://example.com/avatar1.jpg',
                nbVictory: 0,
                totalPlay: 0,
                xp: 0,
                TFASecret: '',
                TFAEnabled: false,
                FT_id: '',
                channels: [],
                friends: [],
                friendOf: [],
                homeMatches: [],
                foreignMatches: [],
                wonMatches: [],
            }

            jest.spyOn(service, 'findOne').mockResolvedValue(player)

            const result = await controller.findOne(playerId)

            expect(result).toEqual(player)
        })
    })

    describe('update', () => {
        it('should update a player with the given id', async () => {
            const playerId = '1'
            const updatePlayerDto: UpdatePlayerDto = {
                login: 'updatedPlayer',
                avatarUrl: 'http://example.com/updated-avatar.jpg',
                nbVictory: 10,
                totalPlay: 20,
                xp: 100,
            }

            const updatedPlayer: Player = {
                id: 1,
                login: 'updatedPlayer',
                avatarUrl: 'http://example.com/updated-avatar.jpg',
                nbVictory: 10,
                totalPlay: 20,
                xp: 100,
                TFASecret: '',
                TFAEnabled: false,
                FT_id: '',
                channels: [],
                friends: [],
                friendOf: [],
                homeMatches: [],
                foreignMatches: [],
                wonMatches: [],
            }

            jest.spyOn(service, 'update').mockResolvedValue(updatedPlayer)

            const result = await controller.update(playerId, updatePlayerDto)

            expect(result).toEqual(updatedPlayer)
        })
    })

    describe('remove', () => {
        it('should remove a player with the given id', async () => {
            const playerId = '1'
            const removedPlayer: Player = {
                id: 1,
                login: 'removedPlayer',
                avatarUrl: 'http://example.com/avatar.jpg',
                nbVictory: 0,
                totalPlay: 0,
                xp: 0,
                TFASecret: '',
                TFAEnabled: false,
                FT_id: '',
                channels: [],
                friends: [],
                friendOf: [],
                homeMatches: [],
                foreignMatches: [],
                wonMatches: [],
            }

            jest.spyOn(service, 'remove').mockResolvedValue(removedPlayer)

            const result = await controller.remove(playerId)

            expect(result).toEqual(removedPlayer)
        })
    })
})
