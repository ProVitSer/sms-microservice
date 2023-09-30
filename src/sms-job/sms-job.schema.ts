import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { SmsJobSendStatus, SmsJobStatus } from './interfaces/sms-job.enum';
import { SmsApiProviderType } from '@app/sms-config/interfaces/sms.-config.enum';

@Schema({ collection: 'sms-job' })
export class SmsJob {
    @Prop({ enum: SmsJobStatus })
    status: SmsJobStatus;

    @Prop({ type: String })
    name: string;

    @Prop({ enum: SmsApiProviderType })
    smsApiProviderType: SmsApiProviderType;

    @Prop({ type: String, default: uuidv4, unique: true })
    smsJobId: string;

    @Prop({ type: String })
    clientId: string;

    @Prop({ type: String })
    sender: string;

    @Prop({ type: [String] })
    externalNumbers: string[];

    @Prop()
    sendSmsInfo: SendSmsInfo[];

    @Prop({ type: String })
    smsText: string;

    @Prop({ type: Date })
    sendTime: Date;

    @Prop({ type: String })
    result: string;

    @Prop({ type: Boolean, default: false })
    deleted?: boolean;

    @Prop({ type: Date, default: Date.now })
    created?: Date;

    @Prop({ type: Date, default: Date.now })
    changed?: Date;
}

@Schema()
export class SendSmsInfo {
    @Prop({ enum: SmsJobSendStatus, isRequired: false })
    sendStatus?: SmsJobSendStatus;

    @Prop()
    smsId?: string;

    @Prop({ type: String })
    number: string;

    @Prop({ type: String })
    result: string;

    @Prop({ type: Date, default: Date.now })
    created?: Date;

    @Prop({ type: Date, default: Date.now })
    changed?: Date;
}

const SmsJobSchema = SchemaFactory.createForClass(SmsJob);

export type SmsJobDocument = SmsJob & Document;

export { SmsJobSchema };
