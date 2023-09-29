import { Prop, Schema } from '@nestjs/mongoose';
import { SmsApiProviderType } from '../interfaces/sms.-config.enum';

@Schema({ _id: false })
export class SmsProviderConfig {
    @Prop({ type: String, enum: SmsApiProviderType })
    smsApiProvider: SmsApiProviderType;

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
