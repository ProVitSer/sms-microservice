import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class SmsTimeRanges {
    @Prop({ type: String })
    start: string;

    @Prop({ type: String })
    end: string;

    @Prop({ type: String })
    sender: string;

    @Prop({ type: String })
    smsText: string;
}
