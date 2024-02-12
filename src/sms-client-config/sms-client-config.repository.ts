import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SmsClientConfigEntity } from './sms-client-config.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SmsClientConfiRepository {
    constructor(@InjectRepository(SmsClientConfigEntity) private SmsClientConfigRepo: Repository<SmsClientConfigEntity>) {}

    async save(user: User): Promise<User> {
        return await this.repo.save(user);
    }
}
