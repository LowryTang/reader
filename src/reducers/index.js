import '../../assets/style/index.styl'

import { combineReducers } from 'redux'
import bookList from './bookList'
import selectedBook from './selectedBook'

const rootReducer = combineReducers({
  bookList, selectedBook
});

export default rootReducer;
