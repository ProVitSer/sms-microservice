import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Sms, SmsDocument } from '../sms.schema';

@Injectable()
export class SmsModelService {
    constructor(@InjectModel(Sms.name) private smsModel: Model<SmsDocument>) {}

    public async create(data: Sms): Promise<Sms> {
        const smsTimeRangesConfig = new this.smsModel({ ...data });

        await smsTimeRangesConfig.save();

        return smsTimeRangesConfig.toObject();
    }

    public async find(filter: { [key: string]: any }, projection?: { [key in keyof Sms]: number }): Promise<Sms[]> {
        return await this.smsModel.find(filter, projection).exec();
    }

    public async update(filter: { [key: string]: any }, data: { [key: string]: any }) {
        data.changed = new Date();
        return await this.smsModel.updateOne({ ...filter }, { $set: { ...data } });
    }
}
