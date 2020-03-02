import ExpressService from "./Services/ExpressService/Service"

class Application {

    public static main(argv: string[]) {
        console.log("运行参数:", ...argv)
        this.initialize();
    }

    private static async  initialize() {
        await Application.Services.express.initialize();
    }
}

namespace Application {
    export namespace Services {
        export const express: ExpressService = new ExpressService();
    }
}

Application.main(process.argv)

export default Application;
