export interface Configs {
    redis: RedisConfig;
    mongo: MongoConfig;
    app: AppConfig;
}

export interface AppConfig {
    port: number;
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
