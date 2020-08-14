//模块对象
const {ChatModel} = require('../db/model');
console.log('ChatModel',ChatModel);
module.exports = function (server) {
    // 得到 IO 对象
    const io = require('socket.io')(server);
    // 监视连接(当有一个客户连接上时回调)
    io.on('connection', function (socket) {
        console.log('soketio connected');
        // 绑定 sendMsg 监听, 接收客户端发送的消息
        socket.on('sendMsg',  ({from, to, content})=> {
            /*console.log('服务器接收到浏览器的消息', data)
            // 向客户端发送消息(名称, 数据)

            console.log('服务器向浏览器发送消息', data)*/
            let chat_id=[from,to].sort().join('_');
            let create_time=Date.now();
            //存储聊天内容
            new ChatModel({from,to,chat_id,content,create_time})
                .save((err,chatMes)=>{
                //socket.emit('receiveMsg', chatMes);//只给当前的对接浏览器发消息
                io.emit('receiveMsg', chatMes)//给所有的对接浏览器发消息
            })

        })
    })
};