import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import TodoReducer from './reducers/TodoReducers'

const Store = createStore(TodoReducer, applyMiddleware(thunk))

export default Store
