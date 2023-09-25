import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Sms, SmsDocument } from '../schemas/sms.schema';

@Injectable()
export class SmsModelService {
    constructor(@InjectModel(Sms.name) private SmsModel: Model<SmsDocument>) {}

    public async create(data: Sms): Promise<Sms> {
        const smsTimeRangesConfig = new this.SmsModel({ ...data });

        await smsTimeRangesConfig.save();

        return smsTimeRangesConfig.toObject();
    }
}
