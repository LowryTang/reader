import * as types from '../constants/ActionTypes'
import assign from 'lodash/assign'

const initialState = {
  isLoading: false,
  books: [],
  page: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.SEARCH_BOOK:
      return assign({}, state, {
        books: state.books.concat(action.books),
        isLoading: false,
        keyword: action.keyword,
        page: state.page + 1
      });
    case types.START_LOADING:
      let data = {isLoading: true};
      if (action.clean) {
        data.books = [];
      }
      return assign({}, state, data);
    default:
      return state;
  }
}
