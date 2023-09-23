import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class SmsProviderConfig {
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
