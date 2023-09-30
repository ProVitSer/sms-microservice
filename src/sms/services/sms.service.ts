import { CacheService } from '@app/cache/cache.service';
import { Injectable } from '@nestjs/common';
import { SmsClientConfig, SmsTimeRanges } from '@app/sms-config/interfaces/sms-config.interfaces';
import { AppLoggerService } from '@app/app-logger/app-logger.service';
import { CLIENT_CONFIG_ERROR, CLIENT_DEACTIVATE, NOT_SEND_INTERVALS } from '../sms.consts';
import { parse, isWithinInterval, format } from 'date-fns';
import { SmsModelService } from './sms-model.service';
import { CancelDataAdapter } from '../adapters/cancel-data.adapter';
import { BaseSendSmsDataAdapter } from '../adapters/base-send-sms-data.adapter';
import { SendSmsMsgData } from '../interfaces/sms.interfaces';
import { SmsApiProviderService } from '@app/sms-api/services/sms-api-provider.service';
import { SendSmsDto } from '../dto/send-sms.dto';
import { BaseSendApiSmsDataAdapter } from '../adapters/base-send-api-sms-data.asapter';
import { Sms } from '../sms.schema';
import { CheckSmsStatusResultDataAdapter } from '@app/sms-api/adapters/check-sms-status-result-data.adapter';
import ClientNotActiveException from '../exceptions/client-not-active.exeption';

@Injectable()
export class SmsService {
    constructor(
        private readonly smsModelService: SmsModelService,
        private readonly cacheService: CacheService,
        private readonly log: AppLoggerService,
        private readonly smsApiProviderService: SmsApiProviderService,
    ) {}

    public async sendSms(data: SendSmsMsgData): Promise<void> {
        try {
            const clientConfig = await this.getClientConfig(data);

            await this.checkClientConfig(data, clientConfig);

            await this._sendSms(data, clientConfig);
        } catch (e) {
            this.log.error(e);
            throw e;
        }
    }

    public async getSmsStatus(smsData: Sms): Promise<CheckSmsStatusResultDataAdapter> {
        try {
            const clientConfig = await this.getClientConfig({ clientId: smsData.clientId, externalNumber: smsData.externalNumber });

            const provider = this.smsApiProviderService.getProvider(clientConfig.smsProviderConfig.smsApiProvider);

            return await provider.checkSmsStatus(smsData, clientConfig);
        } catch (e) {
            this.log.error(e);
            throw e;
        }
    }

    public async sendApiSms(smsData: SendSmsDto): Promise<void> {
        try {
            const clientConfig = await this.getClientConfig({ clientId: smsData.clientId, externalNumber: smsData.externalNumber });

            if (!clientConfig.isActive) {
                await this.smsModelService.create(new CancelDataAdapter(smsData, clientConfig, CLIENT_DEACTIVATE));
                throw new ClientNotActiveException(smsData.clientId);
            }

            const provider = this.smsApiProviderService.getProvider(clientConfig.smsProviderConfig.smsApiProvider);

            const result = await provider.sendSms(new BaseSendApiSmsDataAdapter(smsData, clientConfig));

            await this.smsModelService.create(result);
        } catch (e) {
            this.log.error(e);
            throw e;
        }
    }

    private async _sendSms(data: SendSmsMsgData, config: SmsClientConfig): Promise<void> {
        const provider = this.smsApiProviderService.getProvider(config.smsProviderConfig.smsApiProvider);

        const result = await provider.sendSms(new BaseSendSmsDataAdapter(data, config));

        await this.smsModelService.create(result);
    }

    private async getClientConfig(data: SendSmsMsgData): Promise<SmsClientConfig> {
        const clientConf = await this.cacheService.get<SmsClientConfig>(data.clientId);

        if (!clientConf) throw new Error(`${CLIENT_CONFIG_ERROR}: ${data.clientId}`);

        return clientConf;
    }

    private async checkClientConfig(data: SendSmsMsgData, config: SmsClientConfig): Promise<void> {
        if (!this.checkInterval(config)) throw await this.smsModelService.create(new CancelDataAdapter(data, config, NOT_SEND_INTERVALS));

        if (!config.isActive) throw await this.smsModelService.create(new CancelDataAdapter(data, config, CLIENT_DEACTIVATE));
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
