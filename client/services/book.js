import request from '../lib/request.js'
import config from '../config.js'

let host = config.dev_host;

if (__PROD__) {
  host = config.prod_host;
}

let book_service = host + config.book_endpoint;
let chapter_service = host + config.chapter_endpoint;
let image_service = host + config.image_endpoint;

const BookService = {
  searchBook(name, page = 0) {
    const limit = 40;
    const start = page * limit;
    const url = `${book_service}/books/search?query=${name}&limit=${limit}&start=${start}`;
    return request.get(url);
  },

  getBookDetailById(id) {
    // const url = `${book_service}/book/${id}`;
    const url = `${book_service}/books/${id}`;
    return request.get(url);
  },

  getBookResourcesById(id) {
    // const url = `${book_service}/toc?view=summary&book=${id}`;
    const url = `${book_service}/books/${id}/resources`;
    return request.get(url);
  },

  getBookChaptersByResource(resourceId) {
    const url = `${book_service}/resources/${resourceId}`;
    return request.get(url);
  },

  getChapterContent(chapterUrl) {
    chapterUrl = encodeURIComponent(chapterUrl);
    const url = `${chapter_service}/chapters?uri=${chapterUrl}`;
    return request.get(url).then(res => {
      return res.data.chapter.body;
    });
  },

  getBookImage(url) {
    if (!url) {
      return null;
    }
    url = url.replace('/agent/', '');
    url = encodeURIComponent(url)
    return image_service + '?uri=' + url;
  }
};

module.exports = BookService;
