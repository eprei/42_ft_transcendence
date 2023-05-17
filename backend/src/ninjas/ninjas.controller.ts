import { Controller, Get, Post } from '@nestjs/common';

@Controller('ninjas')
export class NinjasController {

	@Get()
	getNinjas() {
		return [];
	}

	@Get(':id')
	getOneNinjas() {
		return {};
	}

	@Post()
	createNinjas() {
		return {};
	}
	
}
