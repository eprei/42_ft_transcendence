import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
    private users = [
        {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            age: 30,
        },
        {
            id: 2,
            firstName: 'Jane',
            lastName: 'Smith',
            age: 25,
        },
    ]
    create(createUserDto: CreateUserDto) {
        console.log(createUserDto)
        this.users.push(createUserDto)
        return createUserDto
    }

    findAll() {
        return this.users
    }
}
