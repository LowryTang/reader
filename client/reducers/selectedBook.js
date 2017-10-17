import * as types from '../constants/ActionTypes'
import assign from 'lodash/assign'

const initialState = {
  isLoading: false,
  detail: {},
  resources: [],
  chapters: {},
  chapterContent: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.BOOK_DETAIL:
      return assign({}, state, {
        detail: action.book
      });
    case types.BOOK_CHAPTERS:
      return assign({}, state, {
        resources: action.resources,
        chapters: action.chapters
      });
    case types.CHAPTER_CONTENT:
      return assign({}, state, {
        chapterContent: action.chapterContent
      });
    default:
      return state;
  }
}
