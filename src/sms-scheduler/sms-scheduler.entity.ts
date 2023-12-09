import { SmsClientConfigEntity } from '@app/sms-client-config/sms-client-config.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class SmsSchedulerEntity {
    @PrimaryGeneratedColumn()
    scheduled_id: number;

    @Column()
    scheduled_text: string;

    @Column()
    scheduled_time: Date;

    @Column()
    scheduled_date: Date;

    @Column()
    status: string;

    @Column()
    timestamp: Date;

    @ManyToOne(() => SmsClientConfigEntity, (client) => client.smsSchedulerList)
    client: SmsClientConfigEntity;
}
