import React, {Component} from 'react'

//router

import {withRouter} from 'react-router-dom'

//第三方
import {TabBar} from 'antd-mobile';
import PropTypes from 'prop-types'


class NavFooter extends Component {
    constructor() {
        super();
        this.state = {
            hidden: false,
            fullScreen: false,
        };
    }
    static propTypes={
        navList:PropTypes.array.isRequired,
        unReader:PropTypes.number.isRequired
    };
    render() {
        return (<TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
            hidden={this.state.hidden}
        >
            {this.props.navList.map((item,index)=>(
                <TabBar.Item
                    //标题
                    title={item.title}
                    //标识
                    key={item.title}
                    badge={item.path==='/message'?(this.props.unReader):0}
                    // 未选中展示图片
                    icon={<div style={{
                        width: '22px',
                        height: '22px',
                        background:`url(${require(`./nav/${item.icon}.png`)}) center center /  21px 21px no-repeat`
                    }}/>}
                    // 选中后的展示图片
                    selectedIcon={<div style={{
                        width: '22px',
                        height: '22px',
                        background:`url(${require(`./nav/${item.icon}-selected.png`)}) center center /  21px 21px no-repeat`
                    }}
                    />
                    }
                    //是否选中
                    selected={this.props.location.pathname === item.path}
                    /*badge={1}*/
                    //点击的时候
                    onPress={() =>{this.props.history.replace(item.path)} }
                    data-seed="logId"
                >
                </TabBar.Item>
            ))}


        </TabBar>)
    }
}

export default withRouter(NavFooter)