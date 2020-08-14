/*所有的action creator 工厂函数(生成action)*/

import {
    POST_REGISTER,
    POST_LOGIN ,
    POST_UPDATEUSER,
    GET_USERLIST,
    GET_MESLIST,
    GET_ONEMES,
    POST_RENDERMES} from './action-types'

import {
    Toast
} from 'antd-mobile';

import {registerApi,loginApi,userUpdate,getUser,getUserList,getMesList,readMestoTrue} from "../api/api";

//socket
import io from 'socket.io-client'

//实现聊天功能
//自定义方法--初始化SocketIo
const initSocketio=(dispatch,userId)=>{
    if (!io.socket){
        // 连接服务器, 得到代表连接的 socket 对象
        io.socket = io('ws://localhost:5000');
        // 绑定'receiveMessage'的监听, 来接收服务器发送的消息
        io.socket.on('receiveMsg',  (chatMes)=> {
            //服务器发送的消息与当前用户/目标用户相关
            //console.log('浏览器端接收到消息:', chatMes);
            //debugger
           /* console.log('userId======',userId);
            console.log('from======',chatMes.from);
            console.log('to======',chatMes.to);*/
            if (userId===chatMes.from||userId===chatMes.to){
                //console.log('浏览器端接收到消息:', chatMes);
                dispatch(getOneMesData({chatMes,userId}))
            }
        });
    }
};
//自定义方法--异步获取所有消息(非action)
const asyncGetMesList=(dispatch,userId)=>{
    console.log('userId======',userId);
    initSocketio(dispatch,userId);
    getMesList()
        .then(res=>{
            const {users,chatMsgs}=res.data.data;
            //console.log(users,chatMsgs);
            dispatch(getMesListData({users,chatMsgs,userId}))
    })
        .catch(err=>console.log(err));
};
//向服务器发送消息
export const asyncSendMes=({from,to,content})=>{
    return dispatch=>{
        /*console.log('发送请求',{from,to,content})*/
        io.socket.emit('sendMsg', {from,to,content});//浏览器==客户端发消息
        //console.log('浏览器端向服务器发送消息:', {name: 'Tom', date: Date.now()});
    }
};






//同步方法
//注册
const changeRegisterData=(res)=>({type:POST_REGISTER,res});
//登录
const changeLoginData=(res)=>({type:POST_LOGIN,res});
//保存
export const updateLoginData=(res)=>({type:POST_UPDATEUSER,res});
//获取用户列表
const getUserListData=(res)=>({type:GET_USERLIST,res});
//获取所有信息列表
const getMesListData=(res)=>({type:GET_MESLIST,res});
//获取一条信息
const getOneMesData=(res)=>({type:GET_ONEMES,res});
//修改已读消息
const changeMesData=(res)=>({type:POST_RENDERMES,res});





//异步方法
//登录
export const asyncPostLogin=(data)=>{
    return dispatch=>{
        loginApi(data)
            .then(res=>{
                const data=res.data.data;
                dispatch(changeLoginData(data));
                console.log('登录时候的userId======',data.userId);
                asyncGetMesList(dispatch,data.userId);//获取所有消息列表
                Toast.success(data.mes,.7);
                //console.log('loginApi',data);
                //window.location.href='/'
            })
            .catch(err=>console.log(err));
    }
};
//注册
export const asyncPostReg=(data)=>{
    return dispatch=>{
        registerApi(data)
            .then(res=>{
                const data=res.data.data;
                dispatch(changeRegisterData(data));
                console.log('注册时候的userId======',data.userId);
                asyncGetMesList(dispatch,data.userId);//获取所有消息列表,修改一条消息
                Toast.success(data.mes,.7);
                /*const {pass,type}=data;
                const path=routerNav(type,pass);
                window.location.href=path*/
                //window.location.href='/main'
            })
            .catch(err=>console.log(err));
    }
};
//更新
export const asyncPostUpdateUser=(data)=>{
    return dispatch=>{
        userUpdate(data)
            .then(res=>{
                const data=res.data.data;
                dispatch(updateLoginData(data));
                console.log('更新保存时候的userId======',data.userId);
                asyncGetMesList(dispatch,data.userId);//获取所有消息列表,修改一条消息
                Toast.success(data.mes,.7);
                /*window.location.href='/'*/
                //console.log('asyncPostUpdateUser',data);
            })
            .catch(err=>console.log(err));
    }
};
//获取当前用户
export const asyncGetUser=()=>{
    return dispatch=>{
        getUser()
            .then(res=>{
                const data=res.data.data;
                //console.log(data._doc);
                console.log('获取当前用户时候的userId======',data.userId);
                asyncGetMesList(dispatch,data.userId);//获取所有消息列表
                dispatch(updateLoginData(data));
            })
            .catch(err=>console.log(err));
    }
};
//获取所有用户列表
export const asyncGetUserList=(type)=>{
    return dispatch=>{
        getUserList(type)
            .then(res=>{
                const data=res.data.data.data;
                //console.log(res);
                dispatch(getUserListData(data));
            })
            .catch(err=>console.log('出错啦',err))
    }
};
//修改消息成已读
export const asyncReadMegs=(data)=>{
    return dispatch=>{
        const {from,to}=data;//目标id
        readMestoTrue({from})
            .then(res=>{
                //console.log(res.data.data);
                //const {from}=data;//目标id
                const readMeg=res.data.data;//已读消息
                dispatch(changeMesData({readMeg,from,to}));
            })
            .catch(err=>console.log(err))
    }
};



