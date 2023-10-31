import { Module } from "@nestjs/common";
import { redisProviders } from "./redis.provider";
import { RedisService } from "./redis.service";

@Module({
    imports: [],
    exports: [...redisProviders],
    providers: [...redisProviders,RedisService],
})
export class RedisModule{
    constructor(){

    }

    
}