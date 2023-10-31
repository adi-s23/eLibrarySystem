import { RedisService } from "./redis.service";
import { REDIS_CACHE } from "../constants";

export const redisProviders = [
    {
        provide: REDIS_CACHE,
        useFactory: async () => {
            const redis  = new  RedisService();
            await redis.buildConnection();
            return redis;
        }
    }
]
