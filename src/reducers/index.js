import '../../assets/style/index.styl'

import { combineReducers } from 'redux'
import bookList from './bookList'

const rootReducer = combineReducers({
  bookList
});

export default rootReducer;
