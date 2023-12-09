import { SmsClientConfigEntity } from '@app/sms-client-config/sms-client-config.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class SmsMessageEntity {
    @PrimaryGeneratedColumn()
    message_id: number;

    @Column()
    recipient_number: string;

    @Column()
    message_text: string;

    @Column()
    status: string;

    @Column()
    timestamp: Date;

    @ManyToOne(() => SmsClientConfigEntity, (client) => client.smsMessages)
    client: SmsClientConfigEntity;
}
