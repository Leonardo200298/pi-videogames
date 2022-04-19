import {applyMiddleware, createStore} from 'redux'
import rootReducer from './reducer/index'
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk'

//middleware para poder hacer acciones con promesas (thunk, asincronicas)
const store = createStore(
    rootReducer,
    composeWithDevTools( applyMiddleware(thunk))
    );

export default store;