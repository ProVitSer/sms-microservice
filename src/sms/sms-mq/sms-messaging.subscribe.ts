import { RabbitMqExchange, QueueTypes, RoutingKey, Channels } from '@app/rabbit/interfaces/rabbit.enum';
import { RabbitSubscribe, Nack } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { SmsService } from '../services/sms.service';
import { SendSmsMsgData } from '../interfaces/sms.interfaces';

@Injectable()
export class SmsMessagingSubscribe {
    constructor(private readonly smsService: SmsService) {}

    @RabbitSubscribe({
        exchange: RabbitMqExchange.presence,
        queue: QueueTypes.sms,
        routingKey: RoutingKey.sendSms,
        queueOptions: {
            channel: Channels.sms,
        },
    })
    public async sendSmsSubHandler(msg: SendSmsMsgData): Promise<void | Nack> {
        try {
            console.log(msg);
            await this.smsService.sendSms(msg);
        } catch (e) {
            return;
        }
    }
}
