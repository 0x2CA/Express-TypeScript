import IService from '../../Interfaces/IService';
import Redis from "redis";

export default class RedisService implements IService {
    public address = "127.0.0.1"
    public prot = 6379
    public client = Redis.createClient(this.prot, this.address);

    async  initialize() {
    }
}