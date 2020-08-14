import React,{ Component }from 'react'
//redux
import {connect} from 'react-redux'
//组件
import UserList from "../User-List";
class Boss extends Component{
    constructor() {
        super();
        this.state = {};
    }
    render(){
        let type='dashen';
        return <UserList type={type}/>
    }
}

export default connect(

)(Boss);