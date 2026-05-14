import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { StringToNumberPipe } from 'src/common/pipes/string-to-number/string-to-number.pipe';
import { AuthGuard } from 'src/common/guards/auth/auth.guard';
import { Roles } from 'src/common/guards/auth/auth.decorator';
import { Role } from 'src/common/guards/auth/auth.enums';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @UseGuards(AuthGuard)
    @Roles(Role.ADMIN, Role.USER)
    getUser() {
        return this.userService.getUsers();
    }

    @Get(':id')
    getUserById(@Param('id', new StringToNumberPipe()) id: number) {
        return this.userService.getUserById(id);
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