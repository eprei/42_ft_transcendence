import { Injectable } from '@nestjs/common'
import { CreateMatchDto } from './dto/create-match.dto'
import { UpdateMatchDto } from './dto/update-match.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Match } from '../typeorm/match.entity'

@Injectable()
export class MatchService {
    constructor(
        @InjectRepository(Match)
        private readonly matchRepository: Repository<Match>
    ) {}

    create(createMatchDto: CreateMatchDto) {
        const newMatch = this.matchRepository.create(createMatchDto)
        return this.matchRepository.save(newMatch)
    }

    findAll() {
        return this.matchRepository.find()
    }

    findOne(id: number) {
        return this.matchRepository.findOne({ where: { id } })
    }

    async update(id: number, updateMatchDto: UpdateMatchDto) {
        const match = await this.findOne(id)
        const updatedMatch = { ...match, ...updateMatchDto }
        return this.matchRepository.save(updatedMatch)
    }

    async remove(id: number) {
        const match = await this.matchRepository.findOne({ where: { id } })
        return this.matchRepository.remove(match)
    }
}
