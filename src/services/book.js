import request from '../lib/request.js'
// const host = 'http://api.zhuishushenqi.com/';
const host = 'http://localhost:3000/api/v1';

const BookService = {
  searchBook(name) {
    const url = `${host}/books/search?query=${name}`;
    return request.get(url);
  },

  getBookDetailById(id) {
    const url = `${host}/books/${id}`;
    return request.get(url);
  },

  getBookResourcesById(id) {
    const url = `${host}/books/${id}/resources`;
    return request.get(url);
  },

  getBookChaptersByResource(resourceId) {
    const url = `${host}/resources/${resourceId}`;
    return request.get(url);
  },

  getChapterContent(chapterUrl) {
    chapterUrl = encodeURIComponent(chapterUrl);
    const url = `${host}/chapters/${chapterUrl}`;
    return request.get(url).then(res => {
      return res.data.chapter.body;
    });
  }

};

module.exports = BookService;
