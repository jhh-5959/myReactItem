import {Toast} from "antd-mobile";

/**
 * 路由导航
 *
 * 根据redux中的type类型跳转至dashen/laoban页面
 *
 */
export function routerNav(type, pass) {
    if (type === 'dashen') {
        if (pass) {
            return '/genius'
        }
        return '/geniusInfo'
    } else if (type === 'laoban') {
        if (pass) {
            return '/boss'
        }
        return '/bossInfo'
    }
}

export function isNull(type,mes) {
    if (type===''||type===undefined||type==={}||type.length===0){
        Toast.info(mes, .7);
        return true
    }
}


//去除双引号
export function removeSymbol(str) {
    let reg = new RegExp('"',"g");
    return str.replace(reg, "");
}
