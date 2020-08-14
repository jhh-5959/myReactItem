//引包
const express = require('express');
const cookie = require('cookie');
const router = express.Router();
const md5 = require('blueimp-md5');

//模块对象
const {UsersModule, ChatModel} = require('../db/model');

//黑名单,直接过滤
const filter = {
    __v: 0
};
const filter2 = {
    __v: 0,
    password: 0
};

/* GET home page. */
router
    .get('/', function (req, res, next) {
        res.render('index', {title: 'Express'});
    })
    //注册接口
    .post('/register', (req, res) => {
        const {userName, password, type} = req.body;
        UsersModule.findOne({userName}, filter, (err, doc) => {
            if (err) {
                console.log(err);
            } else {
                console.log(doc);
                if (doc) {
                    res.send({code: 1, data: {mes: '用户已存在'}});
                } else {
                    /* console.log(doc);*/
                    //实例方法
                    const usrModule = new UsersModule({userName, type, password: md5(password)});
                    usrModule.save((err, doc) => {
                        //console.log(doc);
                        res.cookie('userId', doc._id, {maxAge: 60 * 60 * 24 * 7});
                        const {userName, type, _id} = doc;
                        res.send({
                            code: 0, data: {userId: _id, mes: '注册成功', userName, type}
                        })
                    });
                }
            }
        });
    })
    //登录接口
    .post('/login', (req, res) => {
        /*
        * 1.登录
        * 2.登录判断用户是否存在
        *   存在
        *       判断密码是否正确
        *              正确 --该用户所有信息
        *              不正确 --密码错误
        *   不存在 该用户不存在
        *
        *
        * */
        const {userName, password} = req.body;
        UsersModule.findOne({userName}, filter, (err, doc) => {
            if (err) {
                console.log(err);
            } else {
                if (doc) {
                    //console.log('用户名存在', doc);
                    if (md5(password) === doc.password) {
                        const {userName, type, _id, header} = doc;
                        //console.log('密码正确',doc);
                        res.cookie('userId', doc._id, {maxAge: 60 * 60 * 24 * 7});
                        res.send({code: 0, data: {mes: '登录成功', userId: _id, header, userName, type}});
                    } else {
                        res.send({code: 1, data: {mes: '密码/用户名不正确'}});
                    }
                } else {
                    console.log(doc);
                    res.send({code: 1, data: {mes: '该用户不存在'}});
                }
            }
        });
    })
    //更新接口
    .post('/updateUser', (req, res) => {
        const userId = req.cookies.userId;
        console.log(userId);
        if (!userId) {
            res.send({code: 1, data: {mes: '请先登录'}})
        } else {
            UsersModule.findByIdAndUpdate(userId, req.body, {new: true}, (err, newdata) => {
                if (err) {
                    console.log('err()');
                    res.send({code: 1, data: {mes: '服务器出错'}})
                } else {
                    console.log('newdata()');
                    const {_id, userName, type, header, job, companyName, pay, explain, geniusName} = newdata;

                    if (_id) {
                        res.send({
                            code: 0,
                            data: {
                                userId: _id, mes: '保存成功',
                                userName, type, header, job, companyName, pay, explain, geniusName
                            }
                        })
                    } else {
                        res.send({code: 1, data: {mes: '服务器出错'}})
                    }
                }
            })

        }

    })
    //读取当前用户信息接口
    .get('/user', (req, res) => {
        const userId = req.cookies.userId;
        //console.log(userId);
        if (!userId) {
            res.send({code: 1, data: {mes: '请先登录'}})
        } else {
            UsersModule.findOne({_id: userId}, filter, (err, doc) => {
                if (err) {
                    console.log(err)
                } else {
                    const {_id, userName, type, header, job, companyName, pay, explain, geniusName} = doc;
                    res.send({code: 0,
                        data: {
                            mes: '获取成功',
                            userId: _id,
                            userName,
                            type,
                            header,
                            job,
                            companyName,
                            pay,
                            explain,
                            geniusName
                        }
                    })
                }
            })

        }

    })
    //获取所有的用户信息接口
    .get('/userList', (req, res) => {
        let {type} = req.query;
        if (type) {
            UsersModule.find({type}, filter2, (err, doc) => {
                if (err) {
                    res.send({code: 1, data: {mes: '请求错误'}})
                } else {
                    res.send({
                        code: 0,
                        data: {
                            mes: '获取成功',
                            data: doc
                        }
                    })
                }
            })
        }
        //res.send({code: 0, data: {mes: '请不要尝试注入'}})
    })
    //获取当前用户所有相关聊天信息列表
    .get('/msglist', function (req, res) {
        // 获取 cookie 中的 userid
        const userid = req.cookies.userId;
        // 查询得到所有 user 文档数组
        UsersModule.find(function (err, userDocs) {
            // 用对象存储所有 user 信息: key 为 user 的_id, val 为 name 和 header 组成的 user 对象
            const users = {}; // 对象容器
            userDocs.forEach(doc => {
                //console.log(doc);
                users[doc._id] = {username: doc.userName, header: doc.header}
            });
            /*查询 userid 相关的所有聊天信息
            参数 1: 查询条件
            参数 2: 过滤条件
            参数 3: 回调函数
            */
            ChatModel.find({'$or': [{from: userid}, {to: userid}]}, filter2, function (err, chatMsgs) {
            // 返回包含所有用户和当前用户相关的所有聊天消息的数据
                res.send({code: 0, data: {users, chatMsgs}})
            })
        })
    })
    //修改指定消息为已读
    .post('/readmsg', function (req, res) {
        // 得到请求中的 from 和 to
    const from = req.body.from;
    const to = req.cookies.userId;
        /*更新数据库中的 chat 数据
            参数 1: 查询条件
            参数 2: 更新为指定的数据对象
            参数 3: 是否 1 次更新多条, 默认只更新一条
            参数 4: 更新完成的回调函数
    */
        ChatModel.update({from, to, read: false}, {read: true}, {multi: true}, function (err, doc) {
            console.log('/readmsg', doc);
            res.send({code: 0, data: doc.nModified}) // 更新的数量
        })
    });


module.exports = router;
