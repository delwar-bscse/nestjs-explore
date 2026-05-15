import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseFilters, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/common/guards/auth/auth.guard';
import { Roles } from 'src/common/guards/auth/auth.decorator';
import { Role } from 'src/common/guards/auth/auth.enums';
import { HttpExceptionFilter } from 'src/common/filters/http-exception/http-exception.filter';
import { User } from './user.schema';

@Controller('user')
@UseFilters(HttpExceptionFilter)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @UseGuards(AuthGuard)
    @Roles(Role.ADMIN, Role.USER)
    async getUser(){
        return this.userService.getUsers();
    }

    @Get(':id')
    async getUserById(@Param('id') id: string) {
        return this.userService.getUserById(id);
    }

    @Post()
    async createUser(@Body() data: Partial<User>) {
        return this.userService.createUser(data);
    }

    @Put(':id')
    async putUser(@Param('id') id: string, @Body() data: Partial<User>) {
        return this.userService.putUser(id, data);
    }

    @Patch(':id')
    async patchUser(@Param('id') id: string, @Body() data: Partial<User>) {
        return this.userService.patchUser(id, data);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser(id);
    }
}