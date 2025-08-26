import {Module} from "@nestjs/common";
import Redis from "ioredis";
import {ConfigService} from "@nestjs/config";
import {Config, RedisConfig} from "../../configs/config-type";
import {RedisService} from "./services/redis.service";
import {REDIS_CLIENT} from "./models/redis.constants";

@Module({
    providers: [
        {
            provide: (REDIS_CLIENT),
            useFactory: (configService: ConfigService<Config>) => {
                const config = configService.get<RedisConfig>('redis');
                if (config?.url) {
                    return new Redis(config.url);
                }
                return new Redis({
                    host: config?.host ?? 'localhost',
                    port: config?.port ?? 6379,
                    password: config?.password,
                });
            },
            inject: [ConfigService],
        },
        RedisService,
    ],
    exports: [RedisService, REDIS_CLIENT],
})

export class RedisModule {}