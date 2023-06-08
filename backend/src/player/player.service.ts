import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from 'src/typeorm/Player';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Repository } from '@nestjs/typeorm'

@Injectable()
export class PlayerService {

  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}
  create(createPlayerDto: CreatePlayerDto) {
    return 'This action adds a new player';
  }

  findAll() {
    return `This action returns all player`;
  }

  findOne(id: number) {
    return `This action returns a #${id} player`;
  }

  remove(id: number) {
    return `This action removes a #${id} player`;
  }
}
