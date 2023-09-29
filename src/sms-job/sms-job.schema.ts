import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'sms-job' })
export class SmsJob {
    @Prop({ type: String })
    clientId: string;

    @Prop({ type: String })
    sender: string;

    @Prop({ type: String })
    smsJobId: string;

    @Prop({ type: [String] })
    externalNumbers: string[];

    @Prop({ type: String })
    smsText: string;

    @Prop({ type: String })
    sendTime: string;

    @Prop({ type: Boolean })
    deleted?: boolean;

    @Prop({ type: Date, default: Date.now })
    created?: Date;

    @Prop({ type: Date, default: Date.now })
    changed?: Date;
}

const SmsJobSchema = SchemaFactory.createForClass(SmsJob);

export type SmsJobDocument = SmsJob & Document;

export { SmsJobSchema };
