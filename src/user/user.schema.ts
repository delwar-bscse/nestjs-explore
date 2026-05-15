import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Address } from './address.schema';

// export type UserDocument = User & Document;

@Schema({timestamps: true})
export class User extends Document {
    @Prop({required: true})
    name!: string;

    @Prop({required: true})
    age!: number;

    @Prop()
    email?: string;

    @Prop({type: Address})
    address?: Address;
}

export const UserSchema = SchemaFactory.createForClass(User);