import request from '../lib/request.js'
// const host = 'http://api.zhuishushenqi.com/';
const host = 'http://localhost:3000/api/v1/';

const BookService = {
  searchBook(name) {
    const url = `${host}books/search?query=${name}`;
    return request.get(url);
  },

  getBookDetailById(id) {
    const url = `${host}books/${id}`;
    return request.get(url);
  }

};

module.exports = BookService;
