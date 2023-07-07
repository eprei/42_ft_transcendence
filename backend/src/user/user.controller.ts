import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UsePipes,
    ValidationPipe,
    UseInterceptors,
    UploadedFile,
    BadRequestException,
    Res,
    Request
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateChannelDto } from 'src/channel/dto/update-channel.dto'
import { Express } from 'express'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() createUserDto: CreateUserDto) {
        const user = await this.userService.create(createUserDto)
        return user
    }

    @Get()
    async findAll() {
        const users = await this.userService.findAll()
        return users
    }

	@Get('id/:id')
	async findOne(@Param('id') id: string) {
        const user = await this.userService.findOne(+id)
        return user
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateChannelDto: UpdateChannelDto
    ) {
        const user = await this.userService.update(+id, updateChannelDto)
        return user
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const user = await this.userService.remove(+id)
        return user
    }

    @Post('upload')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    const name = file.originalname.split('.')[0]
                    const fileExtension = file.originalname.split('.')[1]
                    const newFileName =
                        name.split(' ').join('_') +
                        '_' +
                        Date.now() +
                        '.' +
                        fileExtension

                    cb(null, newFileName)
                },
            }),
            fileFilter: (req, file, cb) => {
                if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
                    return cb(null, false)
                }
                cb(null, true)
            },
        })
    )
    uploadPhoto(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException('File is not an image')
        }
        const response = {
            filePath: `http://localhost:8080/api/user/picture/${file.filename}`,
        }

        return response
    }

    @Get('picture/:filename')
    async getPhoto(@Param('filename') filename, @Res() res) {
        res.sendFile(filename, { root: './uploads' })
    }

    @Get("me")
    async getUser(@Request() req: any) {
		const user = await this.userService.findOne(req.user.id);

		const { id, TFASecret, FT_id, ...rest} = user

		return { rest };
    }
}
