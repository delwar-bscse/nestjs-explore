import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    getUser() {
        return this.userService.getUsers();
    }

    @Get(':id')
    getUserById(@Param('id') id: string) {
        return this.userService.getUserById(Number(id));
    }

    @Post()
    createUser(@Body() data: CreateUserDto) {
        return this.userService.createUser(data);
    }

    @Put(':id')
    putUser(@Param('id') id: string, @Body() data: { name: string; age: number }) {
        return this.userService.putUser(Number(id), data);
    }

    @Patch(':id')
    patchUser(@Param('id') id: string, @Body() data: Partial<{ name: string; age: number }>) {
        return this.userService.patchUser(Number(id), data);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser(Number(id));
    }
}
