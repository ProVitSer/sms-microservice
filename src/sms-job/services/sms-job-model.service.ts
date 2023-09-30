import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { SmsJob, SmsJobDocument } from '../sms-job.schema';
import { SMS_JOB_PROJECTION } from '../sms-job.consts';
import mongodb from 'mongodb';

@Injectable()
export class SmsJobModelService {
    constructor(@InjectModel(SmsJob.name) private smsJobModel: Model<SmsJobDocument>) {}

    public async create(data: Omit<SmsJob, 'smsJobId'>): Promise<SmsJob> {
        const smsTimeRangesConfig = new this.smsJobModel({ ...data });

        await smsTimeRangesConfig.save();

        return smsTimeRangesConfig.toObject();
    }

    public async findOne(filter: Partial<SmsJob>): Promise<SmsJob> {
        return await this.smsJobModel.findOne(filter, SMS_JOB_PROJECTION);
    }

    public async find(filter: { [key: string]: any }): Promise<SmsJob[]> {
        return await this.smsJobModel.find(filter, SMS_JOB_PROJECTION);
    }

    public async deleteOne(filter: Partial<SmsJob>): Promise<mongodb.DeleteResult> {
        return await this.smsJobModel.deleteOne(filter);
    }

    public async updateOne(filter: { [key: string]: any }, update: { [key: string]: any }): Promise<UpdateWriteOpResult> {
        update.changed = new Date();
        return await this.smsJobModel.updateOne(filter, update);
    }

    async update(smsJobId: string, data: Partial<SmsJob>) {
        return await this.smsJobModel.findOneAndUpdate({ smsJobId }, data, { new: true });
    }
}
