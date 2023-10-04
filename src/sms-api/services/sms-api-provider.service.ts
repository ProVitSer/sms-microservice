import { SmsApiProviderType } from '@app/sms-config/interfaces/sms.-config.enum';
import { SmsApiProviderInterface, SmsApiProviders } from '../interfaces/sms-api.interfaces';
import { SmsAero } from '../providers/sms-aero/sms-aero';
import { Smsc } from '../providers/smsc/smsc';
import { Injectable } from '@nestjs/common';
import { PROVIDER_ERROR } from '../sms-api.consts';
import { SmsApiProvider } from './sms-api.provider';

@Injectable()
export class SmsApiProviderService implements SmsApiProviderInterface {
    constructor(private readonly smsAero: SmsAero, private readonly smsc: Smsc) {}

    get provider(): SmsApiProviders {
        return {
            [SmsApiProviderType.smsAero]: this.smsAero,
            [SmsApiProviderType.smsc]: this.smsc,
        };
    }

    public getProvider(smsApiProviderType: SmsApiProviderType): SmsApiProvider {
        return this._getProvider(smsApiProviderType);
    }

    private _getProvider(smsApiProviderType: SmsApiProviderType): SmsApiProvider {
        if (!(smsApiProviderType in this.provider)) throw PROVIDER_ERROR;
        return this.provider[smsApiProviderType];
    }
}
