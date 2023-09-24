import { Injectable } from '@nestjs/common';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SmsTimeRanges, SmsTimeRangesDocument } from '../schemas/sms-time-ranges.schema';
import { SMS_TIME_RANGES_PROJECTION } from '../sms-config.consts';
import mongodb from 'mongodb';
import { SmsTimeRangesConfignDto } from '../dto/sms-time-range-config.dto';

@Injectable()
export class SmsTimeRangesModelService {
    constructor(@InjectModel(SmsTimeRanges.name) private smsTimeRangesModel: Model<SmsTimeRangesDocument>) {}

    public async find(filter: Partial<SmsTimeRanges>): Promise<SmsTimeRanges[]> {
        return await this.smsTimeRangesModel.find(filter, SMS_TIME_RANGES_PROJECTION);
    }

    public async findOne(filter: Partial<SmsTimeRanges>) {
        return await this.smsTimeRangesModel.findOne(filter, SMS_TIME_RANGES_PROJECTION);
    }

    public async deleteMany(filter: Partial<SmsTimeRanges>): Promise<mongodb.DeleteResult> {
        return await this.smsTimeRangesModel.deleteMany(filter);
    }

    public async create(data: SmsTimeRangesConfignDto): Promise<SmsTimeRanges> {
        const smsTimeRangesConfig = new this.smsTimeRangesModel({ ...data });

        await smsTimeRangesConfig.save();

        return smsTimeRangesConfig.toObject();
    }

    public async deleteOne(filter: Partial<SmsTimeRanges>): Promise<mongodb.DeleteResult> {
        return await this.smsTimeRangesModel.deleteOne(filter);
    }

    public async updateOne(filter: Partial<SmsTimeRanges>, update: Partial<SmsTimeRanges>): Promise<UpdateWriteOpResult> {
        return await this.smsTimeRangesModel.updateOne(filter, update);
    }
}
