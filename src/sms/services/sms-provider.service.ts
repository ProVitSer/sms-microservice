import { SmsProviderType } from '@app/sms-config/interfaces/sms.-config.enum';
import { SmsProviderInterface, SmsProviders } from '../interfaces/sms.interfaces';
import { SmsAero } from '../providers/sms-aero/sms-aero';
import { SmsRu } from '../providers/sms-ru/sms-ru';
import { Smsc } from '../providers/smsc/smsc';
import { PROVIDER_ERROR } from '../sms.consts';
import { SmsSender } from './sms-sender';

export class SmsProviderService implements SmsProviderInterface {
    constructor(private readonly smsRu: SmsRu, private readonly smsAero: SmsAero, private readonly smsc: Smsc) {}

    get provider(): SmsProviders {
        return {
            [SmsProviderType.smsAero]: this.smsAero,
            [SmsProviderType.smsRu]: this.smsRu,
            [SmsProviderType.smsc]: this.smsc,
        };
    }

    public getProvider(smsProviderType: SmsProviderType): SmsSender {
        return this._getProvider(smsProviderType);
    }

    private _getProvider(smsProviderType: SmsProviderType): SmsSender {
        if (!(smsProviderType in this.provider)) throw PROVIDER_ERROR;
        return this.provider[smsProviderType];
    }
}
