import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Address {
    @Prop({ required: true })
    street!: string;

    @Prop()
    city!: string;

    @Prop()
    state!: string;

    @Prop()
    zipCode!: string;

    @Prop()
    country!: string;
}