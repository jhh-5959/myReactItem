import React, {Component} from 'react'
//Router
import {Redirect} from 'react-router-dom'
//components
import Logo from "../../components/Logo";
import LoginForm from "./LoginForm";
//redux
import {connect} from "react-redux";
//antd-mobile
import {createForm} from "rc-form";
import {
    NavBar,
} from 'antd-mobile';
//utils
//import {getUserId} from "../../utils/handleCookies";
//import {routerNav} from "../../utils/utils";

class Login extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        const {history,location,match,userData}=this.props;
        const {rLink} = userData;
        //const {header: newheader, type: newtype} = newData;
        //不让其跳转至 /login
        if (rLink){
            return <Redirect to={rLink}/>
        }

        return (
            <div>
                {/*头部导航*/}
                <NavBar mode="dark">鹏静直聘</NavBar>
                {/*logo标志*/}
                <Logo/>
                {/*from 表单*/}
                <LoginForm myHistory={history} myLocation={location} myMatch={match}/>
            </div>)
    }
}

export default connect(
    state => ({userData: state.getUserData}),
)(createForm()(Login))