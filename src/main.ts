import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import configuration from '@app/config/config.provider';
import { GlobalValidationPipe } from './pipes/global-validation.pipe';

async function bootstrap() {
    const config = new ConfigService(configuration());
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new GlobalValidationPipe());
    await app.listen(config.get('app.port'));
}
bootstrap();
