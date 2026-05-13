import { Injectable } from '@nestjs/common';
import { ICreateUser, IUser } from './interface/user.interface';

@Injectable()
export class UserService {
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
    createUser(data: ICreateUser): IUser {
        const newUser: IUser = {
            id: this.users.length + 1,
            ...data
        };
        this.users.push(newUser);
        return newUser;
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
