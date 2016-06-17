import * as types from '../constants/ActionTypes'
import assign from 'lodash/assign'

const initialState = {
  books: [{
    "_id": "566e4d347e62feae50d41c52",
    "hasCp": false,
    "title": "仙界网络直播间",
    "cat": "都市",
    "author": "38大虾",
    "site": "qidian",
    "cover": "/agent/http://image.cmfu.com/books/3662021/3662021.jpg",
    "shortIntro": "作为一个网络男主播，张小东突然发现自己直播间突然冒出了一批土神仙！ 一段郭德纲十年前的相声，“好！！再来一段！”财神赵公明哥哥这个冤大头扔下了一片元宝打赏。 “...",
    "lastChapter": "第326章 老粉丝",
    "retentionRatio": 52.55,
    "latelyFollower": 588,
    "wordCount": 819779
  }]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.SEARCH_BOOK:
      return assign({}, state, {
        books: action.books
      });
    default:
      return state;
  }
}
