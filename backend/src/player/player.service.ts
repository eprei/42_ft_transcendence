import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Player } from 'src/typeorm/Player'
import { CreatePlayerDto } from './dto/create-player.dto'
import { Repository } from 'typeorm'

@Injectable()
export class PlayerService {
    constructor(
        @InjectRepository(Player)
        private readonly playerRepository: Repository<Player>
    ) {}
    create(createPlayerDto: CreatePlayerDto) {
        const newPlayer = this.playerRepository.create(createPlayerDto)
        return this.playerRepository.save(newPlayer)
    }

    findAll() {
        return `This action returns all player`
    }

    findOne(id: number) {
        return `This action returns a #${id} player`
    }

    remove(id: number) {
        return `This action removes a #${id} player`
    }
}
