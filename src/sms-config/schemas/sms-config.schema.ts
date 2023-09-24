import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SmsProviderType } from '../interfaces/sms.-config.enum';
import { SmsProviderConfig } from './sms-provider-config.schema';
import { SmsTimeRanges } from './sms-time-ranges.schema';

@Schema({ collection: 'sms-config' })
export class SmsConfig {
    @Prop({ type: String, unique: true })
    clientId: string;

    @Prop()
    smsProvidersConfig: SmsProviderConfig;

    @Prop()
    smsTimeRanges: SmsTimeRanges[];

    @Prop({ type: String, enum: SmsProviderType })
    smsProvider: SmsProviderType;

    @Prop({ type: Boolean })
    deleted?: boolean;

    @Prop({ type: Date, default: Date.now })
    created?: Date;

    @Prop({ type: Date, default: Date.now })
    changed?: Date;
}

const SmsConfigSchema = SchemaFactory.createForClass(SmsConfig);

export type SmsConfigDocument = SmsConfig & Document;

export { SmsConfigSchema };
