/*状态管理核心*/
import {createStore, applyMiddleware} from 'redux'

import {composeWithDevTools} from 'redux-devtools-extension'

import thunk from 'redux-thunk'

import reducers from "./reducers";


/*//redux-persist  //redux 持久化
import storage from 'redux-persist/lib/storage'
import {persistStore, persistReducer} from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
};
const myPersistReducer = persistReducer(persistConfig, reducers);

const store = createStore(
    myPersistReducer,
    composeWithDevTools(applyMiddleware(thunk))
);


export const persistor = persistStore(store);
export default store;

*/

//原始
export default createStore(
    //comments//(单个reducer)
    reducers,//(所有的reducer)
composeWithDevTools(applyMiddleware(thunk))
)


