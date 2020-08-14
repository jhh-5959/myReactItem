import React, {Component} from 'react'
//redux
import {connect} from 'react-redux'
import {asyncGetUser} from "../../redux/actions";
//import {getNewUserData} from "../../redux/reducers";
//router
import {Route, Switch, Redirect} from 'react-router-dom'
//components
import BossInfo from '../Boss-info'
import GeniusInfo from '../Genius-info'
import Boss from '../Boss'
import Genius from '../Genius'
import Message from '../Message'
import Personal from '../Personal'
import NavFooter from "../../components/Nav-footer";
import My404 from "../../components/404";
import Chat from "../Chat";
//utils
import {routerNav} from "../../utils/utils";
import {getUserId} from "../../utils/handleCookies";
//third
import {NavBar, Toast} from "antd-mobile";
//css
import '../../assets/styles/index.less'

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        //所有路由
        this.navList = [
            {
                path: '/boss', // 路由路径
                component: Boss,
                title: '大神列表',
                icon: 'dashen',
                text: '大神',
            },
            {
                path: '/genius', // 路由路径
                component: Genius,
                title: '老板列表',
                icon: 'laoban',
                text: '老板',
            },
            {
                path: '/message', // 路由路径
                component: Message,
                title: '消息列表',
                icon: 'message',
                text: '消息',
            },
            {
                path: '/personal', // 路由路径
                component: Personal,
                title: '用户中心',
                icon: 'personal',
                text: '个人',
            }
        ];
    }


    UNSAFE_componentWillMount() {
        const {userId} = this.props.userData;
        if (getUserId()&&!userId){
            //alert('发送了ajax请求');
            this.props.asyncGetUser()
        }
    }



    render() {
        const {location, mesData} = this.props;
        const {userId, header, type} = this.props.userData;
        //const {userId: newuserId, header: newheader, type: newtype} = this.props.newData;
        if (type==='laoban'){
            this.navList[1].hide=true
        }else if (type==='dashen') {
            this.navList[0].hide=true
        }
        //没有cookice的时候
        if (!getUserId()) {
            Toast.info('请重新登录', .7);
            /*console.log('没有cookie');*/
            //alert('没有cookice');
            return <Redirect to='/login'/>
        }
        if(!userId){
            //alert('redux中没有userId');
            return <div>redux中没有userId</div>
        }else{
            let path = location.pathname;
            if (path === '/') {
                path = routerNav(type, header);
                //alert('Main组件' + path);
                //console.log(type,header?'有头像':'无头像');
                return <Redirect to={path}/>
            }
        }


        const currentRoute = this.navList.find(item => item.path === location.pathname);
        return (
            <div>
                {/*{alert('Main选择路径' + location.pathname)}*/}
                {currentRoute ? <NavBar className='myNavBarStyle'>{currentRoute.title}</NavBar> : null}
                <Switch>
                    {currentRoute ? <Route path={currentRoute.path} component={currentRoute.component}/> : null}
                    <Route path='/bossInfo' component={BossInfo}/>
                    <Route path='/geniusInfo' component={GeniusInfo}/>
                    <Route path='/chat/:userId' component={Chat}/>
                    <Route path='/404' component={My404}/>
                    <Redirect to={'/404'}/>
                </Switch>
                {currentRoute ? <NavFooter unReader={mesData.unReader} navList={this.navList.filter(item=>!item.hide)}/> : null}
            </div>
        )


    }

}

export default connect(
    state => ({userData: state.getUserData,mesData:state.getMesData}),
    {asyncGetUser}
)(Main)


/*if (!getUserId()) {
Toast.info('请重新登录', .7);
console.log('没有cookie');
return <Redirect to='/login'/>
} else {
//有cookice
if (rdLink && !header) {
console.log('没有详情页面信息');
return (
    <div key={this.props.location.key}>
        <Switch>
            <Route path='/bossInfo' component={BossInfo}/>
            <Route path='/geniusInfo' component={GeniusInfo}/>
            <Redirect to={routerNav(type, header)}/>
        </Switch>
    </div>
)
} else {
debugger;

console.log('有详情页面信息');
const currentRoute = this.navList.find(item => item.path === rdLink);
return (
    <div>
        {currentRoute ?<NavBar>{currentRoute.title}</NavBar> : null}
        <Switch>
            {currentRoute?<Route path={currentRoute.path} component={currentRoute.component}/>:null}
            <Redirect to={this.props.location.pathname}/>
        </Switch>
        {currentRoute ?<NavFooter navList={this.navList}/> : null}
    </div>
)


}
}*/