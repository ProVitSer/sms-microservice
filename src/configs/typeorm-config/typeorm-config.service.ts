import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as path from 'path';
import { ConfigServiceType } from '../types/config-service.type';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService<ConfigServiceType>) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const postgre = this.configService.get('postgres', { infer: true } );
  
    return {
      type: 'postgres',
      host: postgre.host,
      port:  postgre.port,
      username:  postgre.user,
      password:  postgre.password,
      database:  postgre.database,
      entities: [path.join(__dirname, '../**/entities/*.entity{.ts,.js}')],
      logging: true,
      migrationsTableName: 'migrations',
      migrations: ['src/migrations/*{.ts,.js}'],
      migrationsRun: postgre.migrationsRun,
      namingStrategy: new SnakeNamingStrategy(),
      synchronize: true,
    };
  }
}
