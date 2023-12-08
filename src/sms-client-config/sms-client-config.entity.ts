
import { SmsMessageEntity } from '@app/sms-message/sms-message.entity';
import { SmsSchedulerEntity } from '@app/sms-scheduler/sms-scheduler.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity()
export class SmsClientConfigEntity {
  @PrimaryGeneratedColumn()
  client_id: number;

  @Column()
  client_name: string;

  @Column()
  sms_service_provider: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  api_key: string;

  @OneToMany(() => SmsMessageEntity, smsMessage => smsMessage.client)
  smsMessages: SmsMessageEntity[];

  @OneToMany(() => SmsSchedulerEntity, scheduledSms => scheduledSms.client)
  smsSchedulerList: SmsSchedulerEntity[];
}