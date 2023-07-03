import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Player } from 'src/typeorm/player.entity'
import { CreatePlayerDto } from './dto/create-player.dto'
import { Repository } from 'typeorm'
import { UpdatePlayerDto } from './dto/update-player.dto'

@Injectable()
export class PlayerService {
    constructor(
        @InjectRepository(Player)
        private readonly playerRepository: Repository<Player>
    ) {}
    create(createPlayerDto: CreatePlayerDto) {
        const player = this.playerRepository.create(createPlayerDto)
        return this.playerRepository.save(player)
    }

    findAll() {
        return this.playerRepository.find()
    }

    findOne(id: number) {
        return this.playerRepository.findOneBy({ id: id })
    }

    async update(id: number, updatePlayerDto: UpdatePlayerDto) {
        const player = await this.findOne(id)
        return this.playerRepository.save({ ...player, ...updatePlayerDto })
    }

    async remove(id: number) {
        const player = await this.findOne(id)
        return this.playerRepository.remove(player)
    }
}
