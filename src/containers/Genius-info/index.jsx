//react
import React, {Component} from 'react'
//redux
import {connect} from 'react-redux'
import {asyncPostUpdateUser} from "../../redux/actions";
//router
import {Redirect} from 'react-router-dom'
//组件
import HeadPortrait from "../../components/Head-portrait";
//第三方库
import {createForm} from 'rc-form'
import {
    NavBar,
    InputItem,
    List, Button,
} from 'antd-mobile';
//自定义
import {isNull} from "../../utils/utils";


class GeniusInfo extends Component{
     constructor() {
         super();
         this.state = {
             header:''
         };
     }

    //保存
     handleGenius=()=>{
         const {form,asyncPostUpdateUser}=this.props;
         const {job,geniusName}=form.getFieldsValue();
         const {header}=this.state;
         if (isNull(job,'请填写求职岗位')){
             return false
         }
         if (isNull(geniusName,'请填写个人名称')){
             return false
         }
         if (isNull(header,'请选择头像')){
             return false
         }
         const data={job,geniusName,header};
         //console.log(data);
         asyncPostUpdateUser(data);
         form.resetFields();
     };
     //头像
     handleHeader=(url)=>{
         //console.log(url);
         this.setState({header:url});
         //console.log(this.state.header)
     };

     render() {
         const {getFieldProps} = this.props.form;
         const {userData}=this.props;
         const {header} = userData;
         if (header){
             return <Redirect to='/genius'/>
         }
         return (<div>
             <NavBar mode="dark">Genius信息完善</NavBar>
             <HeadPortrait handleHeader={(url)=>this.handleHeader(url)}/>
             <List>
                 <InputItem
                     {...getFieldProps('job',{initialValue:''})}
                     clear
                 >求职岗位:</InputItem>
                 <InputItem
                     {...getFieldProps('geniusName',{initialValue:''})}
                     clear
                 >个人简介:</InputItem>
                 <Button type="primary" onClick={this.handleGenius}>保存</Button>
             </List>
         </div>)

     }
}

export default connect(
    state => ({userData: state.getUserData}),
    {asyncPostUpdateUser}
)(createForm()(GeniusInfo))