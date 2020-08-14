import React, {Component} from 'react'
//import md5 from "blueimp-md5"

//router
//import {Redirect} from 'react-router-dom'


//redux
import {connect} from 'react-redux'
import {asyncPostLogin} from "../../redux/actions";

//第三方包
import PropTypes from 'prop-types';
import {createForm} from 'rc-form';

import {
    List,
    InputItem,
    WhiteSpace,
    Button,
    WingBlank,
} from 'antd-mobile';

//自定义方法
import {isNull} from "../../utils/utils";
import {getUserId} from "../../utils/handleCookies";


class LoginForm extends Component {
    constructor() {
        super();
        this.state = {
            userName: '',
            password: ''
        };
    }

    static propstype = {
        myHistory: PropTypes.object.isRequire,
        form: PropTypes.object.isRequire,
        asyncPostLogin: PropTypes.func.isRequired
    };
    handleLogin = () => {
        //console.log(JSON.stringify({...this.state}));
        const {form, asyncPostLogin,userData} = this.props;
        const {userName, password} = form.getFieldsValue();
        const {header, rdLink} = userData;
        //验证表单
        if (isNull(userName,'输入用户名')){
            return false
        }
        if (isNull(userName,'请输入密码')){
            return false
        }
        const data = {userName, password};
        if (header && getUserId()) {
           window.location.href=rdLink;
        }
        asyncPostLogin(data);
        //清空1：
        /*form.setFields({"userName":""});
        form.setFields({"password":""});*/
        //清空2：
        form.resetFields();


    };
    handleRouter = () => {
        const {myHistory} = this.props;
        /* console.log(myHistory)*/
        myHistory.replace('/register')

    };

    render() {
        /*from 表单*/
        /*const {loginData}=this.props;*/
        const {getFieldProps} = this.props.form;
        //const {userName, password} = this.state;

        /*if (loginData.redirect){
            return <Redirect to={loginData.redirect}/>
        }*/

        return (

            <WingBlank>
                <List>
                    <InputItem
                        clear
                        placeholder="请输入用户名"
                        {...getFieldProps('userName', {initialValue: ''})}
                    >用户名：</InputItem>
                    <InputItem
                        clear
                        placeholder="请输入密码"
                        type="password"
                        {...getFieldProps('password', {initialValue: ''})}
                        //onChange={(val)=>this.handleFromData(val,'password')}
                    >密码：</InputItem>
                    <WingBlank size="md">
                        <WhiteSpace size="md"/>
                        <Button type="primary" onClick={this.handleLogin}>登录</Button>
                        <WhiteSpace size="md"/>
                    </WingBlank>
                    <Button onClick={this.handleRouter}>还没有账号</Button>
                </List>
            </WingBlank>
        )
    }
}


export default connect(
    state => ({userData: state.getUserData}),
    {asyncPostLogin}
)(createForm()(LoginForm))