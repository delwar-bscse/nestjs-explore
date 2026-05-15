import { Injectable } from '@nestjs/common';
import { ICreateUser, IUser } from './interface/user.interface';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private UserModel:Model<UserDocument>) {}

    private users: IUser[] = [
        { id:1, name: 'M D Hossain', age: 30 },
        { id:2, name: 'John Doe', age: 25 }
    ];

    // Method to get all users
    getUsers(): IUser[] {
        return this.users;
    }

    // Method to get a user by ID
    getUserById(id: number): IUser | undefined {
        return this.users.find(user => user.id === id);
    }

    // Method to create a new user
    async createUser(data: Partial<User>): Promise<User> {
        const newUser = new this.UserModel(data);
        return await newUser.save();
    }

    // Method to update a user by ID
    putUser(id: number, data: ICreateUser): IUser | null {
        const user = this.users.find(user => user.id === id);
        if (user) {
            Object.assign(user, data);
            return user;
        }
        return null;
    }

        // Method to update a user by ID
    patchUser(id: number, data: Partial<ICreateUser>): IUser | null {
        const user = this.users.find(user => user.id === id);
        if (user) {
            Object.assign(user, data);
            return user;
        }
        return null;
    }


    // Method to delete a user by ID
    deleteUser(id: number): IUser | null {
        const index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
            const deletedUser = this.users.splice(index, 1);
            return deletedUser[0];
        }
        return null;
    }
}
