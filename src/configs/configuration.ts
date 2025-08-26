import { Config } from './config-type';
import * as process from 'node:process';

const getEnv = (key: string): string => {
    const value = process.env[key];
    if (value === undefined) {
        throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
};

export default (): Config => ({
    app: {
        port: parseInt(getEnv('APP_PORT'), 10),
        host: getEnv('APP_HOST'),
    },
    database: {
        host: getEnv('POSTGRES_HOST'),
        port: parseInt(getEnv('POSTGRES_PORT'), 10),
        user: getEnv('POSTGRES_USER'),
        password: getEnv('POSTGRES_PASSWORD'),
        db: getEnv('POSTGRES_DB'),
        url: getEnv('DATABASE_URL')
    },
    redis: {
        host: getEnv('REDIS_HOST'),
        port: parseInt(getEnv('REDIS_PORT'), 10),
        password: getEnv('REDIS_PASSWORD'),
        url: getEnv('REDIS_URL'),
    }
});