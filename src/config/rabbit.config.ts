import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';
import { ConfigService } from '@nestjs/config';
import { Configs } from './config.interface';

export const getRabbitMQConfig = async (configService: ConfigService<Configs>): Promise<RabbitMQConfig> => {
    return {
        exchanges: [
            {
                name: 'presence',
                type: 'topic',
            },
        ],
        uri: configService.get('rabbitMqUrl'),
        connectionInitOptions: {
            wait: false,
        },
        channels: {
            sms: {
                prefetchCount: 1,
            },
        },
    };
};
