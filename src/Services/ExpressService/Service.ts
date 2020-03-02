import IService from "../../Interfaces/IService"
import Express from "express"
import Http from "http"
import Https from "https"
import Fs from "fs"

export default class Service implements IService {
    public express = Express();
    public port = 8080;
    public sslPort = 443443;

    /**
     * 开始运行服务
     */
    public async start() {
        this.startHttp();

        // 访问路径
        this.express.get('/:name', function (req, res) {
            if (req.protocol === 'https') {
                res.send('https:' + req.params.name);
            } else {
                res.send('http:' + req.params.name);
            }
        });
    }

    public async startHttp() {
        Http.createServer(this.express).listen(this.port, () => {
            console.log('HTTP Server is running on: http://localhost:%s', this.port);
        });
    }

    public async startHttps() {
        Https.createServer({
            key: Fs.readFileSync('./Cert/Privatekey.pem', "utf8"),
            cert: Fs.readFileSync('./Cert/Certificate.crt', "utf8")
        }, this.express).listen(443, () => {
            console.log('HTTPS Server is running on: https://localhost:%s', this.sslPort);
        });
    }
}