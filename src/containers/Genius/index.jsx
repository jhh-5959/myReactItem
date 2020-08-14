import React,{ Component }from 'react'
//redux
import {connect} from 'react-redux'
//组件
import UserList from "../User-List";
class Genius extends Component{
    constructor() {
        super();
        this.state = {};
    }
    render(){
        let type='laoban';
        return <UserList type={type}/>
    }
}

export default connect(
    satae=>({})
)(Genius);