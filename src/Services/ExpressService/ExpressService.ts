import IService from "../../Interfaces/IService"
import Express from "express"
import Http from "http"
import Https from "https"
import Fs from "fs"
import Path from "path"

export default class ExpressService implements IService {
    public express = Express();
    public port = 8080;
    public sslPort = 443443;
    public keyFile = "./Cert/Privatekey.pem"
    public certFile = "./Cert/Certificate.crt"
    public staticFolder = "../../../public"
    public routesFolder = "./Routes"

    /**
     * 初始化服务
     */
    public async initialize() {
        await this.initializeStatic();
        await this.initializeRoutes();
        await this.initializeHttp();
    }


    /**
     * 初始化Http服务
     */
    public async initializeHttp() {
        Http.createServer(this.express).listen(this.port, () => {
            console.log('HTTP 服务运行在: http://localhost:%s', this.port);
        });
    }

    /**
     * 初始化Https服务
     */
    public async initializeHttps() {
        Https.createServer({
            key: Fs.readFileSync(this.keyFile, "utf8"),
            cert: Fs.readFileSync(this.certFile, "utf8")
        }, this.express).listen(443, () => {
            console.log('HTTPS 服务运行在: https://localhost:%s', this.sslPort);
        });
    }

    /**
    * 初始化静态资源
    */
    public async   initializeStatic() {
        console.log("静态资源目录为:", Path.resolve(__dirname, this.staticFolder))
        this.express.use(Express.static(Path.resolve(__dirname, this.staticFolder)))
    }

    /**
      * 初始化路由
      */
    public async   initializeRoutes() {
        console.log("路由目录为:", Path.resolve(__dirname, this.routesFolder))
        const scanResult = this.scanDirRoutes(Path.resolve(__dirname, this.routesFolder));
        for (const prefix in scanResult) {
            if (scanResult.hasOwnProperty(prefix)) {
                console.log("自动加载路由:", prefix);
                this.express.use(prefix, scanResult[prefix])
            }
        }
    }

    /**
     * 文件路径转路由路径
     * @param filename 
     */
    private filename2Route(filename: string) {
        return filename.slice(0, filename.lastIndexOf('.'))
            // 分隔符转换
            .replace(/\\/g, '/')
            // index去除
            .replace('/index', '/')
            // 路径头部/修正
            .replace(/^[/]*/, '/')
            // 路径尾部/去除
            .replace(/[/]*$/, '')
    }

    /**
     * 扫描文件夹下的代码
     * @param rootDir 
     */
    private scanDirRoutes(rootDir: string) {
        // 模块集合
        const routes: { [key: string]: any } = {}
        // 获取目录下的第一级子文件为路由文件队列
        let filenames = Fs.readdirSync(rootDir)
        while (filenames.length) {
            // 路由文件相对路径
            const relativeFilePath = filenames.shift()
            // 路由文件绝对路径
            const absFilePath = Path.join(rootDir, relativeFilePath || "");
            if (Fs.statSync(absFilePath).isDirectory()) {
                // 是文件夹的情况下，读取子目录文件，添加到路由文件队列中
                const subFiles = Fs.readdirSync(absFilePath).map(v => Path.join(absFilePath.replace(rootDir, ''), v))
                filenames = filenames.concat(subFiles)
            } else {
                // 是文件的情况下，将文件路径转化为路由前缀，添加路由前缀和路由模块到模块集合中
                const prefix = this.filename2Route(relativeFilePath || "");
                routes[prefix] = require(absFilePath).default
            }
        }
        return routes
    }

}