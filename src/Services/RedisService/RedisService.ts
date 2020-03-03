import IService from '../../Interfaces/IService';
import Redis from "redis";

export default class RedisService implements IService {
    public config: Redis.ClientOpts = {
        host: "localhost",
        port: 6379
    }
    public client: Redis.RedisClient | null = null;

    async  initialize() {
        this.client = Redis.createClient(this.config);
        this.client.on("error", (...args) => {
            console.error("Redis出错!", ...args);
        })
        this.client.on("connect", () => {
            console.log("Redis连接成功!");
        })
    }
}