import { Injectable } from '@nestjs/common'
import { CreateMatchDto } from './dto/create-match.dto'
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

    findOne(id: number) {
        return this.matchRepository.findOne({ where: { id } })
    }

    async findByUserId(userId: number) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
        })
        if (!user) {
            throw new Error('User not found')
        }
        const matchesDB = await this.matchRepository.find({
            where: [{ winner: user }, { loser: user }],
            relations: ['winner', 'loser'],
        })

        const matchesFront = matchesDB.map((match) => ({
            id: match.id,
            winnerNick: match.winner.nickname,
            winnerNbVictory: match.winner.nbVictory,
            winnerPfp: match.winner.avatarUrl,
            loserNick: match.loser.nickname,
            loserNbVictory: match.loser.nbVictory,
            loserPfp: match.loser.avatarUrl,
            scoreWinner: match.scoreWinner,
            scoreLoser: match.scoreLoser,
        }))

        return matchesFront
    }
}
