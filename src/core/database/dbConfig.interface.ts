export interface dbConfigAttributes{
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    uri: string;
}

export interface dBConfig{
    local: dbConfigAttributes
}