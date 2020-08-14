//react
import React, {Component} from 'react'

//components
import Logo from "../../components/Logo";
import RegisterForm from "./RegisterForm";
//antd-mobile
import {
    NavBar,
} from 'antd-mobile';

//react-redux
import {connect} from "react-redux"
import {asyncGetUser} from "../../redux/actions";
//
import {Redirect} from 'react-router-dom'

class Register extends Component {
    constructor() {
        super();
        this.state = {};
    }




    render() {
        const {history,location,match,userData}=this.props;
        const {rLink} = userData;
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
                <RegisterForm myHistory={history} myLocation={location} myMatch={match}/>
            </div>)
    }
}

export default connect(
    state => ({userData: state.getUserData}),
    {asyncGetUser}
)(Register)