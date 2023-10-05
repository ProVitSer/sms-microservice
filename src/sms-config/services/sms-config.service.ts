import { Injectable, OnModuleInit } from '@nestjs/common';
import { SmsConfig } from '../schemas/sms-config.schema';
import ClientIdExistsException from '../exceptions/client-exists.exception';
import ClientIdNotFoundException from '../exceptions/client-id-not-fround.exeption';
import { SmsConfigActivateDto } from '../dto/sms-config-active.dto';
import { SmsConfigCacheService } from './sms-config-cache.service';
import { SmsConfigModelService } from './sms-config-model.service';
import { SmsTimeRangesModelService } from './sms-time-ranges-model.service';
import { SmsTimeRangesConfignDto } from '../dto/sms-time-range-config.dto';
import { SmsTimeRanges } from '../schemas/sms-time-ranges.schema';
import { parse, isWithinInterval } from 'date-fns';
import AddNewRangeException from '../exceptions/add-new-range.exeption';
import { SmsApiProviderService } from '@app/sms-api/services/sms-api-provider.service';

@Injectable()
export class SmsConfigService implements OnModuleInit {
    constructor(
        private readonly smsConfigCache: SmsConfigCacheService,
        private readonly smsConfigModel: SmsConfigModelService,
        private readonly smsTimeRangesModel: SmsTimeRangesModelService,
        private readonly smsApiProviderService: SmsApiProviderService,
    ) {}

    async onModuleInit() {
        await this.smsConfigCache.initConfigToCache();
    }

    public async addSmsConfig(data: SmsConfig): Promise<SmsConfig> {
        if (await this.smsConfigModel.findOne({ clientId: data.clientId })) throw new ClientIdExistsException(data.clientId);

        const smsConfig = await this.smsConfigModel.create(data);

        await this.smsConfigCache.addConfigToCache(data.clientId, smsConfig);

        return smsConfig;
    }

    public async deleteConfig(clientId: string): Promise<void> {
        await this.smsConfigModel.deleteOne({ clientId });

        await this.smsTimeRangesModel.deleteMany({ clientId });

        await this.smsConfigCache.delConfig(clientId);
    }

    public async getClientConfig(clientId: string): Promise<SmsConfig> {
        const smsConfigs = await this.smsConfigModel.findOne({ clientId });

        if (!smsConfigs) throw new ClientIdNotFoundException(clientId);

        return smsConfigs;
    }

    public async checkClientAuthConfig(clientId: string) {
        const smsConfigs = await this.smsConfigModel.findOne({ clientId });

        if (!smsConfigs) throw new ClientIdNotFoundException(clientId);

        const provider = this.smsApiProviderService.getProvider(smsConfigs.smsProviderConfig.smsApiProvider);

        return await provider.checkAuthorisationSmsProvider(smsConfigs.smsProviderConfig);
    }

    public async modifyActive(data: SmsConfigActivateDto) {
        await this.smsConfigModel.updateOne({ clientId: data.clientId }, { isActive: data.isActive });

        await this.smsConfigCache.updateConfigCache(data.clientId);
    }

    public async addTimeRange(data: SmsTimeRangesConfignDto): Promise<SmsTimeRanges> {
        await this.checkExistsTimeRangesInterval(data);

        const smsTimeRanges = await this.smsTimeRangesModel.create(data);

        await this.smsConfigCache.updateConfigCache(data.clientId);

        return smsTimeRanges;
    }

    public async getClientTimeRanges(clientId: string): Promise<SmsTimeRanges[]> {
        const timeRanges = await this.smsTimeRangesModel.find({ clientId, deleted: false });

        return timeRanges;
    }

    public async deleteRange(rangeId: string): Promise<void> {
        const timeRanges = await this.smsTimeRangesModel.findOne({ rangeId });

        await this.smsTimeRangesModel.updateOne({ rangeId }, { deleted: true });

        await this.smsConfigCache.updateConfigCache(timeRanges.clientId);
    }

    private async checkExistsTimeRangesInterval(data: SmsTimeRangesConfignDto) {
        const newStart = parse(data.start, 'HH:mm', new Date());
        const newEnd = parse(data.end, 'HH:mm', new Date());
        const isOverlappingResult = [];

        const smsTimeRanges = await this.smsTimeRangesModel.find({ clientId: data.clientId });
        const isOverlapping = smsTimeRanges.some((interval: SmsTimeRanges) => {
            const existingStart = parse(interval.start, 'HH:mm', new Date());
            const existingEnd = parse(interval.end, 'HH:mm', new Date());

            const result =
                isWithinInterval(newStart, { start: existingStart, end: existingEnd }) ||
                isWithinInterval(newEnd, { start: existingStart, end: existingEnd });

            if (result) isOverlappingResult.push({ result, name: interval.name });
            return result;
        });

        if (isOverlapping) throw new AddNewRangeException(isOverlappingResult[0].name);
    }
}
