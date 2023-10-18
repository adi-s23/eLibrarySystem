import { dBConfig, dbConfigAttributes } from "./dbConfig.interface";

export class databaseConfig implements dBConfig{
    
        local= {
            username: process.env.DB_USERNAME,
            port: Number(process.env.DB_PORT),
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            uri: 'test'
        }
    
}