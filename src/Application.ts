import ExpressService from "./Services/ExpressService/ExpressService"
import RedisService from "./Services/RedisService/RedisService";
import MongodbService from "./Services/MongodbService/MongodbService";

class Application {

    public static main(argv: string[]) {
        console.log("运行参数:", ...argv)
        this.initialize();
    }

    private static async  initialize() {
        try {
            await Application.Services.redisService.initialize();
        } catch (error) {
            console.error(error)
        }
        try {
            await Application.Services.mongodbService.initialize();
        } catch (error) {
            console.error(error)
        }
        try {
            await Application.Services.expressService.initialize();
        } catch (error) {
            console.error(error)
        }
    }
}

namespace Application {
    export namespace Services {
        export const redisService: RedisService = new RedisService();
        export const mongodbService: MongodbService = new MongodbService();
        export const expressService: ExpressService = new ExpressService();
    }
}

Application.main(process.argv)

export default Application;
