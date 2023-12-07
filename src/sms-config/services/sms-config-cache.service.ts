import { Injectable } from '@nestjs/common';
import { CacheService } from '@app/cache/cache.service';
import { SmsConfigModelService } from './sms-config-model.service';
import { SmsTimeRangesModelService } from './sms-time-ranges-model.service';
import { SmsConfig } from '../schemas/sms-config.schema';
import { SmsClientConfig } from '../interfaces/sms-config.interfaces';

@Injectable()
export class SmsConfigCacheService {
    constructor(
        private readonly cacheService: CacheService,
        private readonly smsConfig: SmsConfigModelService,
        private readonly smsTimeRanges: SmsTimeRangesModelService,
    ) {}

    public async initConfigToCache(): Promise<void> {
        await this.cacheService.reset();

        const smsConfigs = await this.smsConfig.find({ isActive: true });

        for (const config of smsConfigs) {
            const smsTimeRanges = await this.smsTimeRanges.find({ clientId: config.clientId, deleted: false });
            await this.cacheService.set(
                config.clientId,
                JSON.stringify({
                    ...config.toObject(),
                    smsTimeRanges,
                }),
            );
        }
    }

    public async addConfigToCache(clientId: string, smsConfig: SmsConfig): Promise<void> {
        await this.cacheService.set(
            clientId,
            JSON.stringify({
                ...smsConfig,
            }),
        );
    }

    public async delConfig(clientId: string): Promise<void> {
        await this.cacheService.del(clientId);
    }

    public async updateConfigCache(clientId: string): Promise<void> {
        const clientConf = await this.cacheService.get<SmsClientConfig>(clientId);
        if (clientConf) {
            await this.cacheService.del(clientId);
        }

        const smsConfigs = await this.smsConfig.findOne({ clientId });

        const smsTimeRanges = await this.smsTimeRanges.find({ clientId, deleted: false });

        await this.cacheService.set(
            clientId,
            JSON.stringify({
                ...smsConfigs.toObject(),
                smsTimeRanges,
            }),
        );
    }
}
