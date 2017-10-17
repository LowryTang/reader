import '../../assets/style/index.styl'

import { combineReducers } from 'redux'
import search from './search'
import selectedBook from './selectedBook'

const rootReducer = combineReducers({
  search, selectedBook
});

export default rootReducer;
