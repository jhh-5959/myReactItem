//react
import React from 'react';
import ReactDOM from 'react-dom';

//redux
import {Provider} from 'react-redux'
import store from "./redux/store";
//redux-persist redux持久化
//import {persistor} from "./redux/store";
//import { PersistGate } from 'redux-persist/integration/react'


//router
import {BrowserRouter, Route, Switch} from 'react-router-dom'

//component
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import Main from "./containers/Main/Main";

/*//third
import './socketio/socketio'*/


//redux持久化
/*ReactDOM.render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter >
                <Switch>
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                    <Route component={Main}/>
                </Switch>
            </BrowserRouter>
            </PersistGate>
        </Provider>,
    document.getElementById('root')
);*/

ReactDOM.render(
    <Provider store={store}>
            <BrowserRouter >
                <Switch>
                    {/*{alert(`index中选择路径`)}*/}
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                    <Route component={Main}/>
                </Switch>
            </BrowserRouter>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA