import { RedisService } from "./redis.service";
import { REDIS_CACHE } from "../constants";

export const redisProviders = [
    {
        provide: REDIS_CACHE,
        useFactory: async () => {
            try {
                const redis = new RedisService();
                await redis.buildConnection();
                return redis;
            } catch (err) {
                throw err;
            }
        }
    }
]
