import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema({ collection: 'sms-time-ranges' })
export class SmsTimeRanges {
    @Prop({ type: String, unique: false })
    name: string;

    @Prop({ type: String, default: uuidv4, unique: true })
    rangeId: string;

    @Prop({ type: String })
    clientId: string;

    @Prop({ type: String })
    start: string;

    @Prop({ type: String })
    end: string;

    @Prop({ type: String })
    sender: string;

    @Prop({ type: String })
    smsText: string;

    @Prop({ type: Boolean, default: false })
    deleted?: boolean;

    @Prop({ type: Date, default: Date.now })
    created?: Date;

    @Prop({ type: Date, default: Date.now })
    changed?: Date;
}

const SmsTimeRangesSchema = SchemaFactory.createForClass(SmsTimeRanges);

export type SmsTimeRangesDocument = SmsTimeRanges & Document;

export { SmsTimeRangesSchema };
