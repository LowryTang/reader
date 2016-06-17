import request from '../lib/request.js'
import config from '../config.js'

let host = config.dev_host;
if (__PROD__) {
  host = config.prod_host;
}


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
