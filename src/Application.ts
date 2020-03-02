import ExpressService from "./Services/ExpressService/ExpressService"

class Application {

    public static main(argv: string[]) {
        console.log("运行参数:", ...argv)
        this.initialize();
    }

    private static async  initialize() {
        await Application.Services.expressService.initialize();
    }
}

namespace Application {
    export namespace Services {
        export const expressService: ExpressService = new ExpressService();
    }
}

Application.main(process.argv)

export default Application;
