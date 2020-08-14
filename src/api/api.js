import server from "./interceptor";


//登陆
export function loginApi(data) {
    return server.request({
        url: '/login',
        method: 'POST',
        data
    });
}
//注册
export function registerApi(data) {
    return server.request({
        url: '/register',
        method: 'POST',
        data
    });
}
//更新
export function userUpdate(data) {
    return server.request({
        url:'/updateUser',
        method:'post',
        data
    })
}
//获取
export function getUser() {
    return server.request({
        url:'/user',
        method:'get',
    })
}
//获取所有用户信息
export function getUserList(type) {
    return server.request({
        url:'/userList',
        method:'get',
        params:{type:type}
    })
}


//获取所有的消息列表
export function getMesList() {
    return server.request({
        url:'/msglist',
        method:"get",
    })
}
//修改指定消息为已读
export function readMestoTrue(data) {
    return server.request({
        url:'/readmsg',
        method:'post',
        data
    })
}



