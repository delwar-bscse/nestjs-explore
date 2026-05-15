import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) { }

    // Method to get all users
    async getUsers(): Promise<User[]> {
        return this.UserModel.find().exec();
    }

    // Method to get a user by ID
    async getUserById(id: string): Promise<User | null> {
        return this.UserModel.findById(id).exec();
    }

    // Method to create a new user
    async createUser(data: Partial<User>): Promise<User> {
        const newUser = new this.UserModel(data);
        return await newUser.save();
    }

    // Method to update a user by ID
    async putUser(id: string, data: Partial<User>): Promise<User | null> {
        const user = await this.UserModel.findByIdAndUpdate(id, data, { new: true }).exec();
        return user;
    }

    // Method to update a user by ID
    async patchUser(id: string, data: Partial<User>): Promise<User | null> {
        const user = await this.UserModel.findByIdAndUpdate(id, data, { new: true }).exec();
        return user;
    }


    // Method to delete a user by ID
    async deleteUser(id: string): Promise<User | null> {
        const user = await this.UserModel.findByIdAndDelete(id).exec();
        return user;
    }
}