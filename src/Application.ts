import ExpressService from "./Services/ExpressService/Service"

export default class Application {
    public static main(argv: string[]) {
        console.log("运行参数:", ...argv)
        const express: ExpressService = new ExpressService();
        express.initialize();
    }
}

Application.main(process.argv)