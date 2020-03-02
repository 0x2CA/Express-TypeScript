import IService from "../../Interfaces/IService"
import Express from "express"
import Http from "http"
import Https from "https"
import Fs from "fs"

export default class Service implements IService {
    public express = Express();
    public port = 8080;
    public sslPort = 443443;
    public keyFile = "./Cert/Privatekey.pem"
    public certFile = "./Cert/Certificate.crt"

    /**
     * 初始化服务
     */
    public async initialize() {
        this.initializeHttp();

        // 访问路径
        this.express.get('/:name', function (req, res) {
            if (req.protocol === 'https') {
                res.send('https:' + req.params.name);
            } else {
                res.send('http:' + req.params.name);
            }
        });
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
}