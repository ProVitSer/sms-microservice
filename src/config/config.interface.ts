export interface Configs {
    redis: RedisConfig;
    mongo: MongoConfig;
    app: AppConfig;
    log: LogConfig;
    rabbitMqUrl: string;
}

export interface AppConfig {
    port: number;
    smsApiUrl: string;
    smsJobApiUrl: string;
}

export interface MongoConfig {
    username: string;
    password: string;
    host: string;
    database: string;
    port: number;
}

export interface RedisConfig {
    host: string;
    username: string;
    password: string;
    port: number;
    keepAlive?: number;
    ttl?: number;
}

export interface LogConfig {
    path: string;
    formatDate: string;
    mixSize: string;
    maxFiles: string;
}
