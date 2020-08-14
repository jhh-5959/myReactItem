import React, {Component} from 'react'
//redux
import {connect} from 'react-redux'
import {asyncGetUser, updateLoginData} from "../../redux/actions";
//utils
import {clearUserId, getUserId} from "../../utils/handleCookies";
//第三方
import {Result,
    WhiteSpace,
    List,
    Button,Modal} from "antd-mobile";
import {createForm} from 'rc-form';
//style
import '../../assets/styles/index.less'
class Personal extends Component {
    constructor() {
        super();
        this.state = {};
    }
    componentDidMount() {
        const {job} = this.props.userData;
        if (getUserId()&&!job){
            //alert('发送了ajax请求');
            this.props.asyncGetUser()
        }
    }
    render() {
        //userData
        //const {history}=this.props;
        const {header,userName,companyName,type,userId,mes, rLink,...params}=this.props.userData;
        //Result
        const myImg = src => <img src={src} className=" myImgsyle " alt=""/>;
        //TextareaItem
        //const { getFieldProps} = this.props.form;
        //Modal
        const alert = Modal.alert;
        const showAlert = () => {
            const alertInstance = alert('是否退出', '确定要退出嘛???', [
                { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
                { text: '确定退出', onPress: () => {clearUserId();window.location.reload()} },
            ]);
            setTimeout(() => {
                // 可以调用close方法以在外部close
                console.log('auto close');
                alertInstance.close();
            }, 500000);
        };
        //List
        const Item = List.Item;
        const Brief = Item.Brief;

        //console.log(params);
       /* console.log(params);
        var newarr=[];
        /!*for (let key in params){
            let o={};
            o[key]=params[key];
          newarr.push(o)
        }*!/
        for (let key in params){
            newarr.push({[key]:params[key]})
        }
        console.log(newarr);*/




        return (<div className='myUserList'>
            <Result
                img={myImg(header)}
                title={userName}
                message={companyName?<div>{companyName}</div>:null}
            />
            <List renderHeader={() => '相关信息'}>
                <Item>
                    <Brief>职位：{params.job}</Brief>
                    <Brief>简介：{params.explain||params.geniusName}</Brief>
                    {type==='laoban'?<Brief>薪资：{params.pay}</Brief>:null}
                </Item>
            </List>
            <WhiteSpace/>
            <Button type={"warning"} onClick={showAlert}>退出登录</Button>
        </div>)
    }
}


export default createForm()(connect(
    state => ({userData: state.getUserData}),
{updateLoginData,asyncGetUser}
)(Personal)
)