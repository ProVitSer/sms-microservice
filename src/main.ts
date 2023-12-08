import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { initializeTransactionalContext } from 'typeorm-transactional';


async function bootstrap() {
    initializeTransactionalContext();

    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.RMQ,
        options: {
            urls: [process.env.RMQ_URL],
            queue: process.env.SMS_SERVICE_QUEUE,
            queueOptions: { durable: false },
        },
    });



    app.listen().then(() => Logger.log('User microservice start and listening on RabbitMQ'));
}
bootstrap();
