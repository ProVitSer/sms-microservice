import { CommonEntity } from '@app/common/entities';
import { SmsMessageEntity } from '@app/sms-message/sms-message.entity';
import { SmsSchedulerEntity } from '@app/sms-scheduler/sms-scheduler.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity('sms-client-config')
export class SmsClientConfigEntity extends CommonEntity {
    @Column('varchar', { unique: true })
    clientId: string;

    @Column()
    smsServiceProvider: string;

    @Column('varchar', { nullable: true })
    login: string;

    @Column('varchar', { nullable: true })
    password: string;

    @Column('varchar', { nullable: true })
    apiKey: string;

    @OneToMany(() => SmsMessageEntity, (smsMessage) => smsMessage.client)
    smsMessages: SmsMessageEntity[];

    @OneToMany(() => SmsSchedulerEntity, (scheduledSms) => scheduledSms.client)
    smsSchedulerList: SmsSchedulerEntity[];
}
