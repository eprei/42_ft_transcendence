import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateFriendDto } from './dto/create-friend.dto'
import { UpdateFriendDto } from './dto/update-friend.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, createQueryBuilder } from 'typeorm'
import { Friend } from 'src/typeorm/friend.entity'
import { User } from 'src/typeorm/user.entity'

@Injectable()
export class FriendService {
    constructor(
        @InjectRepository(Friend)
        private readonly friendRepository: Repository<Friend>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async create(createFriendDto: CreateFriendDto) {
        const { friendId, isPending } = createFriendDto

        const friend = new Friend()
        friend.friend = await this.userRepository.findOneBy({ id: friendId })

        friend.isPending = isPending

        return this.friendRepository.save(friend)
    }

    findAll() {
        return this.friendRepository.find()
    }

    findOne(friendId: number) {
        return this.friendRepository
            .createQueryBuilder('friend')
            .leftJoinAndSelect('friend.user', 'user')
            .where('friend.id = :id', { id: friendId })
            .getOne()
    }

    async accept(id: number, updateFriendDto: UpdateFriendDto) {
        const friendship = await this.findOne(id)
        if (!friendship) {
            throw new NotFoundException('Friendship not found')
        }

        return this.friendRepository.save({ ...friendship, ...updateFriendDto })
    }

    async remove(id: number) {
        const friendship = await this.findOne(id)
        if (!friendship) {
            throw new NotFoundException('Friendship not found')
        }

        return this.friendRepository.remove(friendship)
    }

    async getAllFriendsByUserId(userId: number) {
        const meAsCreator = await this.friendRepository
            .createQueryBuilder('friend')
            .leftJoin('friend.friend', 'user')
            .leftJoin('friend.createdBy', 'createdBy')
            .where('friend.userId = :userId', { userId })
            .addSelect([
                'user.id',
                'user.nickname',
                'user.avatarUrl',
                'user.status',
                'createdBy.id',
            ])
            .getMany()

        const otherAsCreator = await this.friendRepository
            .createQueryBuilder('friend')
            .leftJoin('friend.user', 'user')
            .leftJoin('friend.createdBy', 'createdBy')
            .where('friend.friendId = :userId', { userId })
            .addSelect([
                'user.id',
                'user.nickname',
                'user.avatarUrl',
                'user.status',
                'createdBy.id',
            ])
            .getMany()

        const allFriends = meAsCreator.concat(otherAsCreator)

        const listOfPendings = allFriends.filter((friend) => friend.isPending)
        const listOfFriends = allFriends.filter((friend) => !friend.isPending)

        const myId = userId

        return { myId, listOfFriends, listOfPendings }
    }

    async getAllNonFriendUsers(userId: number) {
        const myNonFriends = await this.friendRepository
            .createQueryBuilder('friend')
            .innerJoin('friend.friend', 'user')
            .where('friend.userId != :userId', { userId })
            .andWhere('friend.friendId != :userId', { userId })
            .addSelect([
                'user.id',
                'user.nickname',
                'user.avatarUrl',
                'user.status',
            ])
            .getMany()

        const filteredNonFriends = myNonFriends.map((friend) => {
            const { id, nickname, avatarUrl, status } = friend.friend
            const isPending = friend.isPending
            return { id, nickname, avatarUrl, status, isPending }
        })

        return filteredNonFriends
    }

    // async getAllNonFriendUsers(userId: number) {
    // 	const friendIds = await this.friendRepository
    // 	  .createQueryBuilder('friend')
    // 	  .where('friend.userId = :userId', { userId })
    // 	  .select('friend.friendId')
    // 	  .getMany();

    // 	const pendingFriendIds = await this.friendRepository
    // 	  .createQueryBuilder('friend')
    // 	  .where('friend.friendId = :userId', { userId })
    // 	  .andWhere('friend.isPending = true')
    // 	  .select('friend.userId')
    // 	  .getMany();

    // 	const excludedUserIds = [...friendIds.map((friend) => friend.friend), ...pendingFriendIds.map((friend) => friend.user)];

    // 	const nonFriendUsers = await this.userRepository
    // 	  .createQueryBuilder('user')
    // 	  .where('user.id != :userId', { userId })
    // 	  .andWhere('user.id NOT IN (:...excludedUserIds)', { excludedUserIds })
    // 	  .select(['user.id', 'user.nickname', 'user.avatarUrl', 'user.status'])
    // 	  .getMany();

    // 	return nonFriendUsers;
    //   }
}
