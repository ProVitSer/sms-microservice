import { ConfigType } from '@nestjs/config';
import { appConfig } from '../app.config';
import { typeormConfig } from '../typeorm-config/typeorm-config';
import { rmqMicroserviceConfig } from '../rmq-microservice.config';

export type ConfigServiceType = {
    app: ConfigType<typeof appConfig>;
    postgres: ConfigType<typeof typeormConfig>;
    rmq: ConfigType<typeof rmqMicroserviceConfig>;
};
