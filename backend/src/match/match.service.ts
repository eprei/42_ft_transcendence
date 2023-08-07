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
        this.userRepository.update(newMatch.winner, {
            nbVictory: newMatch.winner.nbVictory + 1,
            totalPlay: newMatch.winner.totalPlay + 1,
            xp: newMatch.winner.xp + 50,
        })
        this.userRepository.update(newMatch.loser, {
            totalPlay: newMatch.loser.totalPlay + 1,
            xp: newMatch.loser.xp + 25,
        })
        this.userRepository.save(newMatch.winner)
        this.userRepository.save(newMatch.loser)
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

        const matchesFront = matchesDB.map((m) => ({
            id: m.id,
            winnerNick: m.winner.nickname,
            winnerLevel: Math.floor(m.winner.xp / 100 + 1),
            winnerPfp: m.winner.avatarUrl,
            loserNick: m.loser.nickname,
            loserLevel: Math.floor(m.loser.xp / 100 + 1),
            loserPfp: m.loser.avatarUrl,
            scoreWinner: m.scoreWinner,
            scoreLoser: m.scoreLoser,
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
