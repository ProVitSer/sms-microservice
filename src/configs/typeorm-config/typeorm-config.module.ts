import { Module } from '@nestjs/common';
import { TypeOrmConfigService } from './typeorm-config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmConfigService,
            dataSourceFactory: async (options) => {
                const datasource = await new DataSource(options).initialize();
                return addTransactionalDataSource(datasource);
            },
        }),
    ],
    providers: [],
    exports: [],
})
export class TypeOrmConfigModule {}
