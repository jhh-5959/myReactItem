/*reducers函数 根据state,action方法 返回最新的state*/

import {combineReducers} from 'redux'

import {routerNav,removeSymbol} from "../utils/utils";
import {
    POST_REGISTER,
    POST_LOGIN,
    POST_UPDATEUSER,
    GET_USERLIST,
    GET_MESLIST,
    GET_ONEMES,
    POST_RENDERMES
} from "./action-types";
import {getUserId} from "../utils/handleCookies";


//当前用户所有的信息
const initUserData = {};
export const getUserData = (state = initUserData, action) => {
    switch (action.type) {
        case POST_LOGIN:
            let {type,header}=action.res;
            return {...action.res,rLink:routerNav(type,header)};
        case POST_REGISTER:
            let {type:type1,header:header1}=action.res;
            return {...action.res,rLink:routerNav(type1,header1)};
        case POST_UPDATEUSER:
            let {type:type2,header:header2}=action.res;
            return {...action.res,rLink:routerNav(type2,header2)};
        default:
            return state;
    }
};
//所有用户的信息
const initUserList=[];
//所有的用户消息
export const getListData = (state = initUserList, action) => {
    switch (action.type) {
        case GET_USERLIST:
            return [...action.res];
        default:
            return state;
    }
};
//所有消息
const initMesList={
    users:{},
    chatMsgs:[],
    unReader:0
};
export const getMesData=(state=initMesList,action)=>{
    switch (action.type) {
        case GET_MESLIST:
            const {users,chatMsgs,userId}=action.res;
            return {
                users,
                chatMsgs,
                unReader:chatMsgs.reduce((preNum,mes)=>preNum+(!mes.read&&mes.to===userId),0)
            };
        case GET_ONEMES:
            const {chatMes,userId:newUserId}=action.res;
            return{
                users:state.users,
                chatMsgs:[...state.chatMsgs,chatMes],
                unReader: state.unReader+(!chatMes.read&&chatMes.to===newUserId)
            };
        case POST_RENDERMES:
            const {readMeg,from,to}=action.res;
            console.log('当前id',to);
            console.log('目标id',from);
            console.log('已读数量',readMeg);
            //debugger
            return {
                users:state.users,
                chatMsgs: state.chatMsgs.map(mes=>{
                    if (mes.from===from&&mes.to===to&&!mes.read){
                        console.log(111);
                        return {...mes,read:true}
                    }
                    else{
                        //debugger
                        console.log(222);
                       return mes
                    }
                }),
                unReader: state.unReader-readMeg
            };
        default:
            return state;
    }
};


export default combineReducers({
    getUserData,getListData,getMesData
})