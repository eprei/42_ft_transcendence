import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Player } from 'src/typeorm/Player'
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
        const newUser = this.playerRepository.create(createPlayerDto)
        return this.playerRepository.save(newUser)
    }

    findAll() {
        return this.playerRepository.find()
    }

    findOne(id: number) {
        return this.playerRepository.findOneBy({ id })
    }

    async update(id: number, updatePlayerDto: UpdatePlayerDto) {
        const user = await this.findOne(id)
        return this.playerRepository.save({ ...user, ...updatePlayerDto })
    }

    async remove(id: number) {
        const user = await this.findOne(id)
        return this.playerRepository.remove(user)
    }
}
