import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Sms {
  @Prop({ type: String })
  clientId: string;

  @Prop({ unique: true })
  smsId: string;

  @Prop({ type: String })
  number: string;

  @Prop({ type: String })
  text: string;

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