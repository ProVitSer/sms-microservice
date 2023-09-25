import { CacheService } from '@app/cache/cache.service';
import { Injectable } from '@nestjs/common';
import { SmsMsgData } from '../interfaces/sms.interfaces';
import { SmsClientConfig, SmsTimeRanges } from '@app/sms-config/interfaces/sms-config.interfaces';
import { AppLoggerService } from '@app/app-logger/app-logger.service';
import { CLIENT_CONFIG_ERROR, CLIENT_DEACTIVATE, NOT_SEND_INTERVALS } from '../sms.consts';
import { parse, isWithinInterval, format } from 'date-fns';
import { SmsModelService } from './sms-model.service';
import { CancelDataAdapter } from '../adapters/cancel-data.adapter';
import { SmsProviderService } from './sms-provider.service';

@Injectable()
export class SmsService {
    constructor(
        private readonly smsModelService: SmsModelService,
        private readonly cacheService: CacheService,
        private readonly log: AppLoggerService,
        private readonly smsProvider: SmsProviderService,
    ) {}

    public async sendSms(data: SmsMsgData): Promise<void> {
        try {
            const clientConfig = await this.getClientConfig(data);
            await this.checkClientConfig(data, clientConfig);
            await this._sendSms(data, clientConfig);
        } catch (e) {
            this.log.error(e);
            throw e;
        }
    }

    private async _sendSms(data: SmsMsgData, config: SmsClientConfig) {
        const provider = this.smsProvider.getProvider(config.smsProviderConfig.smsProvider);
        const result = await provider.sendSms(data, config);
        await this.smsModelService.create(result);
    }

    private async getClientConfig(data: SmsMsgData): Promise<SmsClientConfig> {
        const clientConf = await this.cacheService.get<SmsClientConfig>(data.clientId);
        if (!clientConf) throw new Error(`${CLIENT_CONFIG_ERROR}: ${data.clientId}`);
        return clientConf;
    }

    private async checkClientConfig(data: SmsMsgData, config: SmsClientConfig): Promise<void> {
        if (!this.checkInterval(config)) throw await this.smsModelService.create(new CancelDataAdapter(data, NOT_SEND_INTERVALS));
        if (!config.isActive) throw await this.smsModelService.create(new CancelDataAdapter(data, CLIENT_DEACTIVATE));
    }

    private checkInterval(config: SmsClientConfig): boolean {
        const formattedTime = format(new Date(), 'HH:mm');
        const actualTime = parse(formattedTime, 'HH:mm', new Date());

        const isOverlapping = config.smsTimeRanges.some((interval: SmsTimeRanges) => {
            const existingStart = parse(interval.start, 'HH:mm', new Date());
            const existingEnd = parse(interval.end, 'HH:mm', new Date());

            return isWithinInterval(actualTime, { start: existingStart, end: existingEnd });
        });

        return isOverlapping;
    }
}
