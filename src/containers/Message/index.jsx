import React, {Component} from 'react'
//redux
import {connect} from 'react-redux'
//third
import {List, Badge} from 'antd-mobile'

const Item = List.Item;
const Brief = Item.Brief;


function getLastMes(chatMsgs,userId) {
    const lastMesObjs = {};
    chatMsgs.forEach((mes) => {
        /**mes:{
         *  read(pin):false
         *  _id(pin):"5f2815aeb35c873630ebddce"
         *  from(pin):"5f23c6300e5f674e3cef63c0"
         *  to(pin):"5f23cd9a0e5f674e3cef63c2"
         *  chat_id(pin):"5f23c6300e5f674e3cef63c0_5f23cd9a0e5f674e3cef63c2"
         *  content(pin):"123"
         *  create_time(pin):1596462510070
         * }
         **/
        //处理每一条的未读数量
        if (mes.to===userId&&!mes.read){
            mes.unRendNum=1
        }else {
            mes.unRendNum=0
        }


        const chatId = mes.chat_id;//aaaa_bbbb

        let lastMsg = lastMesObjs[chatId];//lastMsg:{read:xx,_id:xx....}
        //console.log(lastMsg);
        //debugger
        if (!lastMsg) {
            lastMesObjs[chatId] = mes;
        } else {
            //累加当前未读消息
            const currentUnRend=mes.unRendNum+lastMsg.unRendNum;
            //根据时间替换最后一条消息
            if (mes.create_time > lastMsg.create_time) {
                lastMesObjs[chatId] = mes;
            }
            //将最新的最后一条消息的赋值为当前累加的未读消息
            lastMesObjs[chatId].unRendNum=currentUnRend;
        }
    });

    //将对象转成数组
    const lastMsgs = Object.values(lastMesObjs);

    //发消息置顶
    lastMsgs.sort((a, b) => {
        return b.create_time - a.create_time
    });
    return lastMsgs;

}


class Message extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        const {user, mes,history} = this.props;
        const {userId} = user;//当前用户的id
        const {users, chatMsgs} = mes;//所有的用户信息和所有的消息
        let lastMes = getLastMes(chatMsgs,userId);
        /*let sumUnReader=lastMes.reduce((prvNum,mes)=>prvNum+mes.unRendNum,0);
        console.log(sumUnReader)*/
        return (<div className='myUserList'>
            <List>
                {lastMes.map(mes=>(<Item
                    onClick={()=>history.push(`/chat/${userId===mes.to?mes.from:mes.to}`)}
                    key={mes._id}
                    extra={<Badge text={mes.unRendNum}/>}
                    thumb={userId===mes.to?users[mes.from].header:users[mes.to].header}
                    arrow='horizontal'
                >
                    {userId===mes.to?users[mes.from].username:users[mes.to].username}
                    <Brief>{mes.content}</Brief>
                </Item>))}
            </List>
        </div>)
    }
}

export default connect(
    state => ({user: state.getUserData, mes: state.getMesData})
)(Message);