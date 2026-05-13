import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    private users = [
        { id:1, name: 'M D Hossain', age: 30 },
        { id:2, name: 'John Doe', age: 25 },
        { id:3, name: 'Jane Smith', age: 28 },
    ];

    // Method to get all users
    getUsers() {
        return this.users;
    }

    // Method to get a user by ID
    getUserById(id: number) {
        return this.users.find(user => user.id === id);
    }

    // Method to create a new user
    createUser(data: { name: string; age: number }) {
        const newUser = {
            id: this.users.length + 1,
            name: data.name,
            age: data.age,
        };
        this.users.push(newUser);
        return newUser;
    }

    // Method to update a user by ID
    putUser(id: number, data: { name: string; age: number }) {
        const user = this.users.find(user => user.id === id);
        if (user) {
            Object.assign(user, data);
            return user;
        }
        return null;
    }

        // Method to update a user by ID
    patchUser(id: number, data: Partial<{ name: string; age: number }>) {
        const user = this.users.find(user => user.id === id);
        if (user) {
            Object.assign(user, data);
            return user;
        }
        return null;
    }


    // Method to delete a user by ID
    deleteUser(id: number) {
        const index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
            const deletedUser = this.users.splice(index, 1);
            return deletedUser[0];
        }
        return null;
    }
}
