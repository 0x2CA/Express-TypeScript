import IService from '../../Interfaces/IService';
import Redis from "redis";

export default class RedisService implements IService {
    public address = "localhost"
    public prot = 6379
    public client: Redis.RedisClient | null = null;

    async  initialize() {
        this.client = Redis.createClient(this.prot, this.address)
        this.client.on("error", (...args) => {
            console.error("Redis出错!", ...args);
        })
    }
}