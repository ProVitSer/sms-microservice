import { SmsSender } from '@app/sms/services/sms-sender';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SmsAero extends SmsSender {}