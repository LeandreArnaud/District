import { createStore } from 'redux'
import tokenReducer from './reducers/tokenReducer'

export default createStore(tokenReducer)