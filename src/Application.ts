import ExpressService from "./Services/ExpressService/Service"

export default class Application {
    public static main(argv: string[]) {
        console.log(argv)
        const express: ExpressService = new ExpressService();
        express.start();
    }
}

Application.main(process.argv)