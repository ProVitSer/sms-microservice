import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SmsConfigModule } from './sms-client-config/sms-client-config.module';
import { SmsSchedulerModule } from './sms-scheduler/sms-scheduler.module';
import { SmsProviderModule } from './sms-provider/sms-provider.module';
import { SmsMessageModule } from './sms-message/sms-message.module';
import { TypeOrmConfigModule } from './configs/typeorm-config/typeorm-config.module';
import { appConfig, appConfigSchema } from './configs/app.config';
import config from './configs/env.config';
import { typeOrmConfigSchema, typeormConfig } from './configs/typeorm-config/typeorm-config';
import { rmqMicroserviceConfig, rmqMicroserviceConfigSchema } from './configs/rmq-microservice.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: config(),
            isGlobal: true,
            load: [appConfig, typeormConfig, rmqMicroserviceConfig],
            validationSchema: appConfigSchema
              .concat(typeOrmConfigSchema)
              .concat(rmqMicroserviceConfigSchema),
            validationOptions: { abortEarly: true },
          }),
        TypeOrmConfigModule,
        SmsConfigModule,
        SmsSchedulerModule,
        SmsProviderModule,
        SmsMessageModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
