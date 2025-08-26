
import { REDIS_CLIENT } from '../models/redis.constants';
import {Inject, Injectable} from "@nestjs/common";
import Redis from "ioredis";

@Injectable()
export class RedisService {
    constructor(
        @Inject(REDIS_CLIENT)
        private readonly redisClient: Redis,
    ) {}

    public async addOneToSet(hash: string, value: string): Promise<number> {
        return this.redisClient.sadd(hash, value);
    }

    public async remOneFromSet(key: string, setMember: string): Promise<number> {
        return this.redisClient.srem(key, setMember);
    }

    public async sMembers(key: string): Promise<string[]> {
        return this.redisClient.smembers(key);
    }
}
