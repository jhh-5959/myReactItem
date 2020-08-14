const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        proxy.createProxyMiddleware('/jxwApi',
            {  //`api`是需要转发的请求
            target: 'http://192.168.0.106:5000/',  // 这里是接口服务器地址
            changeOrigin: true,
            pathRewrite: {'^/jxwApi': ''}
        })
    )
};