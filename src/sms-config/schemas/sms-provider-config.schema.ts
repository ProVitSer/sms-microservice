import { Prop, Schema } from '@nestjs/mongoose';
import { SmsProviderType } from '../interfaces/sms.-config.enum';

@Schema({ _id: false })
export class SmsProviderConfig {
    @Prop({ type: String, enum: SmsProviderType })
    smsProvider: SmsProviderType;

    @Prop({ required: false })
    email?: string;

    @Prop({ required: false })
    api_key?: string;

    @Prop({ required: false })
    api_id?: string;

    @Prop({ required: false })
    login?: string;

    @Prop({ required: false })
    password?: string;
}
