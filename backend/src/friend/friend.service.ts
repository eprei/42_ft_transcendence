import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Friend } from 'src/typeorm/friend.entity'
import { PlayerService } from 'src/player/player.service';

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(Friend)
    private readonly friendRepository: Repository<Friend>,
    private readonly playerService: PlayerService,
  ) {}

  async create(createFriendDto: CreateFriendDto) {
    const { friendId, isPending } = createFriendDto;

    const friend = new Friend();
    friend.friendId = friendId;
    friend.isPending = isPending;

    return this.friendRepository.save(friend);
  }

  findAll() {
    return this.friendRepository.find();
  }

  findOne(friendId: number) {
    return this.friendRepository.findOne({ where: { id: friendId } });
  }

  async update(id: number, updateFriendDto: UpdateFriendDto) {
    const friend = await this.findOne(id);
    if (!friend) {
      throw new NotFoundException('Friend not found');
    }

    return this.friendRepository.save({ ...friend, ...updateFriendDto });
  }

  async remove(id: number) {
    const friend = await this.findOne(id);
    if (!friend) {
      throw new NotFoundException('Friend not found');
    }

    return this.friendRepository.remove(friend);
  }
}

