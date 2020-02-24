import { createStore, combineReducers } from 'redux'

import photo from './reducer/photoReducer'
import menu from './reducer/menuReducer'

export default createStore(combineReducers({ photo, menu }), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
