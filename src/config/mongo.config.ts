import { ConfigService } from '@nestjs/config';
import { MongooseModuleFactoryOptions, MongooseModuleOptions } from '@nestjs/mongoose';
import { Configs } from './config.interface';

export const getMongoUseFactory = async (configService: ConfigService<Configs>): Promise<MongooseModuleFactoryOptions> => {
    return {
        uri: getMongoString(configService),
        ...getMongoOptions(),
    };
};

const getMongoString = (configService: ConfigService<Configs>): string => {
    const { username, password, database, host, port } = configService.get('mongo');
    return `mongodb://${username}:${password}@${host}:${port}/${database}`;
};

const getMongoOptions = (): MongooseModuleOptions => ({});
