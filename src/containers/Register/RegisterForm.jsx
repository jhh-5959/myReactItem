import React,{ Component }from 'react'


import PropTypes from 'prop-types';

//redux
import {connect} from 'react-redux';
import {asyncPostReg} from "../../redux/actions";
//router
//import {Redirect} from 'react-router-dom'
//import {registerApi} from "../../api/api";

import {
    List,
    InputItem,
    WhiteSpace,
    Button,
    WingBlank,
    Radio, Toast,
} from 'antd-mobile';

import { createForm } from 'rc-form';


class RegisterForm  extends Component{
    constructor() {
        super();
        this.state = {
            RadioVal:0
        };
    }
    static propstype={
        myHistory:PropTypes.object.isRequire,
        registerData:PropTypes.object.isRequire,
        asyncPostReg:PropTypes.func.isRequired,
    };
    onChangeRadio = (RadioVal) => {
        //console.log('checkbox');
        this.setState({
            RadioVal,
        });
    };
    handleRegister=()=>{
        //console.log({...this.state})
        const {form,asyncPostReg}=this.props;
        const {RadioVal}=this.state;
        const {userName,password,password2}=form.getFieldsValue();
        //验证表单
        if (userName===''||userName===undefined){
            Toast.info('输入用户名',.7);
            return false
        }
        if (password===''||password===undefined){
            Toast.info('请输入密码',.7);
            return false
        }
        if (password!==password2){
            Toast.info('两者密码不一致',.7);
            return false
        }

        const data={type:RadioVal?'laoban':'dashen',userName,password};
        //console.log(data);
        //redux中 asyncPostReg方法
        asyncPostReg(data);

        /*registerApi(data)
            .then(res=>console.log(res))
            .catch(err=>console.log(err));*/
        form.resetFields();
    };
    handleRouter=()=>{
        const { myHistory }=this.props;
       /* console.log(myHistory)*/
        myHistory.replace('/login')
    };

    render(){
        /*from 表单*/
        const data = [
            { RadioVal: 0, label: '大神' },
            { RadioVal: 1, label: '老板' },
        ];
        const { RadioVal } = this.state;
        const { getFieldProps } = this.props.form;
       /* const {registerData} =this.props;
        if (registerData.redirect){
            return <Redirect to={registerData.redirect} />
        }*/
        return (<WingBlank>
            <List>
                <InputItem
                    clear
                    placeholder="请输入用户名"
                    {...getFieldProps('userName',{initialValue:''})}
                >用户名：</InputItem>
                <InputItem
                    clear
                    placeholder="请输入密码"
                    type="password"
                    {...getFieldProps('password',{initialValue:''})}
                >密码：</InputItem>
                <InputItem
                    clear
                    placeholder="请确认密码"
                    {...getFieldProps('password2',{initialValue:''})}
                    type="password"
                >确认密码：</InputItem>
                <List.Item>
                    <span>用户类型:</span>
                    {data.map(i => (
                        <Radio style={{marginLeft:15}}
                               key={i.RadioVal}
                               checked={RadioVal === i.RadioVal}
                               onChange={() => this.onChangeRadio(i.RadioVal)}>
                            {i.label}
                        </Radio>
                    ))}
                </List.Item>
                <WingBlank size="md">
                    <WhiteSpace size="md"/>
                    <Button type="primary" onClick={this.handleRegister}>注册</Button>
                    <WhiteSpace size="md"/>
                </WingBlank>
                <Button onClick={this.handleRouter}>已有账号</Button>
            </List>
        </WingBlank>)
    }
}

export default connect(
    state => ({userData: state.getUserData}),
    {asyncPostReg}
)(createForm()(RegisterForm))