require("dotenv").config();

const https = require("http"),
  httpProxy = require("http-proxy"),
  HttpProxyRules = require("http-proxy-rules");

const proxy = httpProxy.createProxy();
const port = 4201;

const proxyRules = new HttpProxyRules({
  rules:{
    '/react': `${process.env.BASE_PATH}/react`
  },
  default: 'http://localhost:3000'
});

https
  .createServer((req, res) => {
    let target = proxyRules.match(req);
    return proxy.web(req, res, {
      changeOrigin: true,
      secure: false,
      target,
      headers: {
        "x-host": req.headers.host,
        "x-forwarded-host": process.env.BASE_PATH.split("//")[1]
      }
    });
  })
  .listen(port, err => {
    if (err) {
      return console.log("something bad happened", err);
    }
    console.log(`server is listening on ${port}`);
  });
