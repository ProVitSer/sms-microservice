import { RabbitMqExchange, QueueTypes, RoutingKey, Channels } from '@app/rabbit/interfaces/rabbit.enum';
import { RabbitSubscribe, Nack } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { SmsMsgData } from '../interfaces/sms.interfaces';
import { SmsService } from './sms.service';

@Injectable()
export class SmsMessagingSubService {
    constructor(private readonly smsService: SmsService) {}

    @RabbitSubscribe({
        exchange: RabbitMqExchange.presence,
        queue: QueueTypes.sms,
        routingKey: RoutingKey.sendSms,
        queueOptions: {
            channel: Channels.sms,
        },
    })
    public async sendSmsSubHandler(msg: SmsMsgData): Promise<void | Nack> {
        try {
            await this.smsService.sendSms(msg);
        } catch (e) {
            return;
        }
    }
}
