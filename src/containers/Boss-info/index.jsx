import React, {Component} from 'react'
//redux
import {connect} from 'react-redux'
import {asyncPostUpdateUser} from "../../redux/actions";

//组件
import HeadPortrait from "../../components/Head-portrait";
//第三方
import {createForm} from 'rc-form'

import {Redirect} from 'react-router-dom'

import {
    NavBar,
    InputItem,
    TextareaItem,
    List, Button
} from 'antd-mobile';





class BossInfo extends Component {
    constructor() {
        super();
        this.state = {
            header:''
        };
    }
    //保存
    handleBoss=()=>{
        const {form,asyncPostUpdateUser}=this.props;
        const {job,companyName,pay,explain}=form.getFieldsValue();
        const {header}=this.state;
        const data={job,companyName,pay,explain,header};
        //console.log(data);
        asyncPostUpdateUser(data);
        form.resetFields();
    };
    handleHeader=(url)=>{
        this.setState({header:url});
    };

    render() {
        const {getFieldProps} = this.props.form;
        const {userData}=this.props;
        const {header} = userData;
        if (header){
            return <Redirect to='/boss'/>
        }
        return (<div>
            <NavBar mode="dark">Boos信息完善</NavBar>
           <HeadPortrait handleHeader={(url)=>this.handleHeader(url)}/>
            <List>
                <InputItem
                    {...getFieldProps('job',{initialValue:''})}
                    clear
                >招聘职位:</InputItem>
                <InputItem
                    {...getFieldProps('companyName',{initialValue:''})}
                    clear
                >公司名称:</InputItem>
                <InputItem
                    {...getFieldProps('pay',{initialValue:''})}
                    clear
                >职位薪资:</InputItem>
                <TextareaItem
                    title="职位要求:"
                    data-seed="logId"
                    autoHeight
                    {...getFieldProps('explain',{initialValue:''})}
                    rows={2}/>
                <Button type="primary" onClick={this.handleBoss}>保存</Button>
            </List>
        </div>)
    }
}

export default connect(
    state => ({userData: state.getUserData}),
    {asyncPostUpdateUser}
)
(createForm()(BossInfo))