
import IService from '../../Interfaces/IService';
import Mongodb from "mongodb";
const MongoClient = Mongodb.MongoClient;

export default class MongodbService implements IService {
    public address = "localhost"
    public prot = 27017
    public dbName = ""
    public url = `mongodb://${this.address}:${this.prot}/${this.dbName}`
    public client: Mongodb.MongoClient | null = null;

    async  initialize() {
        MongoClient.connect(this.url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
            if (err) throw err;
            console.log(`数据库${this.url}连接成功!`)
            this.client = db;
        });
    }
}