import React, {Component} from 'react'
//redux
import {connect} from 'react-redux'
import {asyncGetUserList} from "../../redux/actions";

//third
import PropTypes from 'prop-types'
import {Card, WingBlank, WhiteSpace} from 'antd-mobile';
//-------ant motion
import QueueAnim from 'rc-queue-anim';
//style
import '../../assets/styles/index.less'
//router
import {withRouter} from 'react-router-dom'

class UserList extends Component {
    constructor() {
        super();
        this.state = {};
    }

    static propTypes = {
        type: PropTypes.string.isRequired,
        asyncGetUserList: PropTypes.func.isRequired
    };

    componentDidMount() {
        const {type, asyncGetUserList} = this.props;
        //console.log(this.props);
        if (type) {
            asyncGetUserList(type);
        }
    }


    render() {
        const {userList, history} = this.props;
        //console.log(userList);

        return (
            <div className="myUserList">
                <QueueAnim type='scaleBig' delay={3}>
                {userList.map(item => (
                    <WingBlank size="lg" key={item._id}>
                        <WhiteSpace size="md"/>

                            <Card onClick={() => history.push(`/chat/${item._id}`)}>
                            <Card.Header
                                thumb={item.header}
                                extra={<span>{item.userName}</span>}
                            />
                            <Card.Body>
                                <div>职位: {item.job}</div>
                                <WhiteSpace size="md"/>
                                {item.pay ? <div>月薪: {item.pay}</div> : null}
                                {item.pay ? <WhiteSpace size="md"/> : null}
                                {item.companyName ? <div>公司名字: {item.companyName}</div> : null}
                                {item.companyName ? <WhiteSpace size="md"/> : null}
                                <div>描述: {item.explain ? item.explain : item.geniusName}</div>

                            </Card.Body>
                        </Card>


                        <WhiteSpace size="sm"/>
                    </WingBlank>))}
                </QueueAnim>
            </div>)
    }
}

export default withRouter(connect(
    state => ({userList: state.getListData}),
    {asyncGetUserList}
)(UserList))
