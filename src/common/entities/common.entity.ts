import dayjs from 'dayjs';
import { BeforeInsert, BeforeUpdate, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class CommonEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @BeforeInsert()
    beforeInsertHook() {
        this.createdAt = dayjs().toDate();
        this.updatedAt = dayjs().toDate();
    }

    @BeforeUpdate()
    beforeUpdateHook() {
        this.updatedAt = dayjs().toDate();
    }
}
