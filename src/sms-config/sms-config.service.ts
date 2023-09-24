import { CacheService } from '@app/cache/cache.service';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { SmsConfig, SmsConfigDocument } from './schemas/sms-config.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SmsConfigService implements OnModuleInit {
    constructor(
        @InjectModel(SmsConfig.name) private smsConfigModel: Model<SmsConfigDocument>,
        private readonly cacheService: CacheService,
    ) {}

    async onModuleInit() {
        const smsConfig = new this.smsConfigModel();
        await smsConfig.save();
    }
}
