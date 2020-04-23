import {createStore, combineReducers, applyMiddleware} from 'redux'
import contactReducer from './reducer/addContactReducer'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {autoRehydrate} from 'redux-persist'

const reducer = combineReducers({contact: contactReducer})

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(thunk),
    autoRehydrate()
  ))

export default store