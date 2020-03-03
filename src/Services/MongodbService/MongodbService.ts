
import IService from '../../Interfaces/IService';
import Mongodb from "mongodb";

export default class MongodbService implements IService {
    public address = "localhost"
    public prot = 27017
    public dbName = "TestDB"
    public url = `mongodb://${this.address}:${this.prot}/${this.dbName}`
    public client: Mongodb.MongoClient | null = null;

    async  initialize() {
        this.client = await Mongodb.MongoClient.connect(this.url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log(`MongoDB数据库${this.url}连接成功!`)
    }
}