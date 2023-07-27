import { Injectable } from '@nestjs/common'
import { CreateMatchDto } from './dto/create-match.dto'
import { UpdateMatchDto } from './dto/update-match.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Match } from '../typeorm/match.entity'
import { User } from '../typeorm/user.entity'

@Injectable()
export class MatchService {
    constructor(
        @InjectRepository(Match)
        private readonly matchRepository: Repository<Match>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
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

    async findByUserId(userId: number) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
        })
        const matchesDB = await this.matchRepository.find({
            where: [{ winner: user }, { loser: user }],
            relations: ['winner', 'loser'],
        })

        const matchesFront = matchesDB.map((match) => ({
            id: match.id,
            winnerNick: match.winner.nickname,
            winnerPfp: match.winner.avatarUrl,
            loserNick: match.loser.nickname,
            loserPfp: match.loser.avatarUrl,
            scoreWinner: match.scoreWinner,
            scoreLoser: match.scoreLoser,
        }))

        return matchesFront
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
