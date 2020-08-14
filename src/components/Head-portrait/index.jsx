import React from 'react'

import {List, Grid, ImagePicker, WhiteSpace} from 'antd-mobile';

import './headPortrait.less'

import PropTypes from 'prop-types'

const data = Array.from(new Array(20)).map((_val, i) => ({
    icon: require(`./img/头像${i + 1}.png`),
    text: `头像${i + 1}`,
}));

export default class HeadPortrait extends React.Component {
    constructor(props) {
        super();
        this.state = {
            files: [],
            multiple: false,
        }
    };
    componentDidMount() {
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'))
        }, 0)
    }

    static propsType = {
        handleHeader: PropTypes.func.isRequired
    };
    onChangeHead = (files, type, index) => {
        console.log(files, type, index);
        this.setState({files});
        const {handleHeader} = this.props;
        if (type === 'add') {
            const url = files[0]['url'];
            handleHeader(url)
        }
        if (type === 'remove') {
            handleHeader('')
        }
    };
    onClickHead = (_el) => {
        const {handleHeader} = this.props;
        const {icon, text} = _el;
        const files = [{url: `${icon}`, id: `${text}`}];
        this.setState({files});
        handleHeader(icon)
    };

    render() {
        const {files} = this.state;
        return (<List
            renderHeader={() => '请选择头像:'}>
            <Grid data={data}
                  isCarousel
                  carouselMaxRow={1}
                  onClick={_el => this.onClickHead(_el)}/>
            <div className="sub-title">{this.state.files.length > 0 ? '当前头像:' : '自定义头像'}</div>
            <ImagePicker
                files={files}
                onChange={this.onChangeHead}
                onImageClick={(index, fs) => console.log(index, fs)}
                selectable={files.length < 1}
                multiple={this.state.multiple}
            />
            <WhiteSpace/>
        </List>)
    }
}
