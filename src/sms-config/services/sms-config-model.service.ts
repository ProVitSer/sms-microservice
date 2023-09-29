import { Injectable } from '@nestjs/common';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SmsConfig, SmsConfigDocument } from '../schemas/sms-config.schema';
import { SMS_CONFIG_PROJECTION } from '../sms-config.consts';
import mongodb from 'mongodb';

@Injectable()
export class SmsConfigModelService {
    constructor(@InjectModel(SmsConfig.name) private smsConfigModel: Model<SmsConfigDocument>) {}

    public async find(filter: Partial<SmsConfig>) {
        return await this.smsConfigModel.find(filter, SMS_CONFIG_PROJECTION);
    }

    public async findOne(filter: Partial<SmsConfig>) {
        return await this.smsConfigModel.findOne(filter, SMS_CONFIG_PROJECTION);
    }

    public async create(data: SmsConfig): Promise<SmsConfig> {
        const smsConfig = new this.smsConfigModel({ ...data });

        await smsConfig.save();

        return smsConfig.toObject();
    }

    public async deleteOne(filter: Partial<SmsConfig>): Promise<mongodb.DeleteResult> {
        return await this.smsConfigModel.deleteOne(filter);
    }

    public async updateOne(filter: Partial<SmsConfig>, update: Partial<SmsConfig>): Promise<UpdateWriteOpResult> {
        update.changed = new Date();
        return await this.smsConfigModel.updateOne(filter, update);
    }
}
