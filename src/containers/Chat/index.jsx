import React, {Component} from 'react'

//redux
import {connect} from "react-redux";
import {asyncSendMes,asyncReadMegs} from "../../redux/actions";
//third
import {NavBar, List, InputItem, Icon, Grid} from 'antd-mobile'
import {createForm} from 'rc-form'
//-------ant motion
import QueueAnim from 'rc-queue-anim';
//utils
/*import {getUserId} from "../../utils/handleCookies";
import {removeSymbol} from "../../utils/utils";*/

const Item = List.Item;


class Chat extends Component {
    constructor() {
        super();
        this.state = {
            isShow: false
        };
    }

    //发送
    handleSend = () => {
        const {form, user, match, asyncSendMes} = this.props;
        const {getFieldsValue} = form;
        const {content} = getFieldsValue();
        let from = user.userId;
        let to = match.params.userId;
        //console.log(from,to,content);
        if (content) {
            asyncSendMes({from, to, content});
        }
        form.resetFields();
    };
    //点击表情包
    handleFace = () => {
        let {isShow} = this.state;
        this.setState({isShow: !isShow});
        if (isShow) {
            // 异步手动派发 resize 事件,解决表情列表显示的 bug
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'))
            }, 0)
        }
    };
    //生命周期
    UNSAFE_componentWillMount() {
        let faceArr = ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '☺', '😚', '😙', '😋', '😛', '😜', '🤪', '😝', '🤑'];

        this.faceData = faceArr.map((_val, i) => ({
            text: _val
        }));
    }

    componentDidMount() {
        // 初始显示列表
        window.scrollTo(0, document.body.scrollHeight)
    }

    componentDidUpdate() {
        // 更新显示列表
        window.scrollTo(0, document.body.scrollHeight)
    }
    componentWillUnmount() {
        const {match,user} = this.props;
        let from = match.params.userId;//目标id
        //let to=removeSymbol(getUserId().split(':')[1]);//当前id
        let to=user.userId;//当前id
        this.props.asyncReadMegs({from,to});
    }


    //点击选中的表情
    onClickHead = (_el) => {
        //console.log(_el.text);
        const {form} = this.props;
        const{ getFieldsValue,setFieldsValue }=form;
        const {content} =getFieldsValue();
        //console.log(content);

        setFieldsValue({
            content:content+_el.text
        })

        /* const {handleHeader} = this.props;
         const {icon, text} = _el;
         const files = [{url: `${icon}`, id: `${text}`}];
         this.setState({files});
         handleHeader(icon)*/
    };

    render() {
        const {mess, user, match, history} = this.props;
        const {getFieldProps} = this.props.form;
        const {chatMsgs, users} = mess;
        let {isShow} = this.state;
        let from = user.userId;
        let to = match.params.userId;
        let BelongToCurrent = chatMsgs.filter((item) => item.chat_id === [from, to].sort().join('_'));
        let toHeard = users[to].header;
        /*let toUserName=match.params.userName;*/
        //console.log('目标的id',to);
        return (<div id='chat-page '>
                <NavBar icon={<Icon type="left" onClick={() => history.go(-1)}/>}
                        className='myNavBarStyle'>{users[to].username}</NavBar>
                <List className='myChatList' style={isShow ? {paddingBottom: 105} : null}>
                    {/*alpha left right top bottom scale scaleBig scaleX scaleY*/}
                    <QueueAnim type='bottom' delay={5}>
                        {BelongToCurrent.map((item) => {
                            if (item.to === to) {
                                return (
                                    <Item
                                        key={item._id}
                                        className='chat-me'
                                        extra='我'
                                    >
                                        {item.content}
                                    </Item>
                                )
                            } else {
                                return (<Item
                                    thumb={toHeard}
                                    key={item._id}
                                >
                                    {item.content}
                                </Item>)
                            }
                        })}
                    </QueueAnim>
                </List>
                <div className='my-am-tab-bar'>
                    <InputItem
                        placeholder="请输入"
                        {...getFieldProps('content', {initialValue: ''})}
                        extra={
                            <div className={{height: 40}}>
                                <span onClick={this.handleFace}>😃       </span>
                                <span onClick={this.handleSend}>发送</span>
                            </div>
                        }
                    />
                    {isShow ? (<Grid
                        itemStyle={{zIndex: 1, width: 10, height: 60}}
                        data={this.faceData}
                        isCarousel
                        columnNum={6}
                        carouselMaxRow={1}
                        onClick={_el => this.onClickHead(_el)}/>) : null}

                </div>
            </div>
        )
    }


}

export default connect(
    state => ({user: state.getUserData, mess: state.getMesData}),
    {asyncSendMes,asyncReadMegs}
)(createForm()(Chat))
