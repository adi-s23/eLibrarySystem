import { Inject, Injectable } from "@nestjs/common";
import {Redis} from "ioredis";

@Injectable()
export class RedisService{

    private connection;

    constructor(){
        
    }

    async buildConnection(){
        this.connection=  new Redis();
    }

    async getConnection(){
        return this.connection;
    }

    async set(key: string,value: string|number){
        await this.connection.set(key,value);
    }

    async hset(key: string,value: object){
        await this.connection.hset(key,value);
    }

    async expire(key: string,value: number){
        await this.connection.expire(key,value);
    }

    async get(key: string){
        return await this.connection.get(key);
    }

    async incr(key: string){
        await this.connection.incr(key);
    }

    async del(key: string){
        await this.connection.del(key);
    }

    async hgetall(key: string){
        return await this.connection.hgetall(key);
    }

    async hdel(key: string){
        await this.connection.hdel(key);
    }
}