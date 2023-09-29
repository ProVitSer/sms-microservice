import { SmsProviderType } from '@app/sms-config/interfaces/sms.-config.enum';
import { SmsProviderInterface, SmsProviders } from '../interfaces/sms.interfaces';
import { SmsAero } from './sms-aero/sms-aero';
import { SmsRu } from './sms-ru/sms-ru';
import { Smsc } from './smsc/smsc';
import { PROVIDER_ERROR } from '../sms.consts';
import { SmsProvider } from './sms.provider';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SmsProviderService implements SmsProviderInterface {
    constructor(private readonly smsRu: SmsRu, private readonly smsAero: SmsAero, private readonly smsc: Smsc) {}

    get provider(): SmsProviders {
        return {
            [SmsProviderType.smsAero]: this.smsAero,
            [SmsProviderType.smsRu]: this.smsRu,
            [SmsProviderType.smsc]: this.smsc,
        };
    }

    public getProvider(smsProviderType: SmsProviderType): SmsProvider {
        return this._getProvider(smsProviderType);
    }

    private _getProvider(smsProviderType: SmsProviderType): SmsProvider {
        if (!(smsProviderType in this.provider)) throw PROVIDER_ERROR;
        return this.provider[smsProviderType];
    }
}
