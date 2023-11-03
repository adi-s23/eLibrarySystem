import { Inject, Injectable } from "@nestjs/common";
import { Redis } from "ioredis";

@Injectable()
export class RedisService {

    private connection;

    constructor() {

    }

    async buildConnection() {
        try {
            this.connection = await new Redis();
        } catch (err) {
            throw err;
        }
    }

    async set(key: string, value: string | number): Promise<void> {
        try {
            await this.connection.set(key, value);
        } catch (error) {
            throw error;
        }
    }

    async hset(key: string, value: object): Promise<void> {
        try {
            await this.connection.hset(key, value);
        } catch (error) {
            throw error;
        }
    }

    async expire(key: string, value: number): Promise<void> {
        try {
            await this.connection.expire(key, value);
        } catch (error) {
            throw error;
        }
    }

    async get(key: string): Promise<string> {
        try {
            const value: string = await this.connection.get(key);
            return value;
        } catch (err) {
            throw err;
        }
    }

    async incr(key: string): Promise<void> {
        try {
            await this.connection.incr(key);
        } catch (error) {
            throw error;
        }
    }

    async del(key: string): Promise<void> {
        try {
            await this.connection.del(key);
        } catch (error) {
            throw error;
        }
    }

    async hgetall(key: string): Promise<object> {
        try {
            const values = await this.connection.hgetall(key);
            return values;
        } catch (error) {
            throw error;
        }
    }

    async hdel(key: string): Promise<void> {
        try {
            await this.connection.hdel(key);
        } catch (error) {
            throw error;
        }
    }
}