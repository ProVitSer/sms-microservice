import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SmsStatus } from '../interfaces/sms.enum';
import { SmsProviderType } from '@app/sms-config/interfaces/sms.-config.enum';

@Schema({ collection: 'sms' })
export class Sms {
    @Prop({ enum: SmsStatus })
    status: SmsStatus;

    @Prop({ enum: SmsProviderType })
    smsProvider: SmsProviderType;

    @Prop({ type: String })
    clientId: string;

    @Prop({ unique: true })
    smsId?: string;

    @Prop({ type: String })
    number: string;

    @Prop({ type: String })
    text?: string;

    @Prop({ type: String })
    result: string;

    @Prop({ type: Number })
    checkSmsStatusAttempts?: number;

    @Prop({ type: Boolean })
    deleted?: boolean;

    @Prop({ type: Date, default: Date.now })
    created?: Date;

    @Prop({ type: Date, default: Date.now })
    changed?: Date;
}

const SmsSchema = SchemaFactory.createForClass(Sms);

export type SmsDocument = Sms & Document;

export { SmsSchema };
