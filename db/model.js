//引入mongoose这个包
const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
//连接某个数据库
mongoose.connect('mongodb://localhost/pj_test',
    {useNewUrlParser: true, useUnifiedTopology: true}, (err, db) => {
        if (err) {
            console.log('运行失败')
        } else {
            console.log('运行成功')
        }
    });

//创建Schema
const user = mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    header: {type: String},
    job: {type: String},
    companyName: {type: String},
    pay: {type: String},
    explain: {type: String},
    geniusName:{type: String}
});
//创造构造函数模型
exports.UsersModule=mongoose.model('Users', user);

// 定义 chats 集合的文档结构
const chatSchema = mongoose.Schema({
    from: {type: String, required: true}, // 发送用户的 id
    to: {type: String, required: true}, // 接收用户的 id
    chat_id: {type: String, required: true}, // from 和 to 组成的字符串
    content: {type: String, required: true}, // 内容
    read: {type:Boolean, default: false}, // 标识是否已读
    create_time: {type: Number} // 创建时间
});
// 定义能操作 chats 集合数据的 Model// 向外暴露 Model
exports.ChatModel = mongoose.model('chat', chatSchema);
