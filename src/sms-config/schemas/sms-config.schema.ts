import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SmsProviderConfig } from './sms-provider-config.schema';

@Schema({ collection: 'sms-config' })
export class SmsConfig {
    @Prop({ type: String, unique: true })
    clientId: string;

    @Prop()
    smsProviderConfig: SmsProviderConfig;

    @Prop({ type: [String] })
    senders: string[];

    @Prop({ type: Boolean, default: true })
    isActive?: boolean;

    @Prop({ type: Date, default: Date.now })
    created?: Date;

    @Prop({ type: Date, default: Date.now })
    changed?: Date;
}

const SmsConfigSchema = SchemaFactory.createForClass(SmsConfig);

export type SmsConfigDocument = SmsConfig & Document;

export { SmsConfigSchema };
