var express = require('express');
var debug = require('debug')('reader:controller');
var axios = require('axios');

var request = axios.create({
  baseURL: 'http://api.zhuishushenqi.com',
  headers: {
    'X-Device-Id': '631cf212b409f949264fad9ba1ba1daa',
    'X-User-Agent': 'YouShaQi/2.24.24',
    'User-Agent': 'YouShaQi/2.24.24',
    'Content-Type': 'application/json'
  }
});

var controller = {
  searchBooks(req, res, next) {
    var query = req.query.query;
    // var options = {
    //   uri: 'http://api.zhuishushenqi.com/book/fuzzy-search',
    //   qs: { query },
    //   method:"GET",
    //   encoding: null,
    //   headers: {
    //     'X-Device-Id': '631cf212b409f949264fad9ba1ba1daa',
    //     'X-User-Agent': 'YouShaQi/2.24.24',
    //     'User-Agent': 'YouShaQi/2.24.24',
    //     'Content-Type': 'application/json'
    //   }
    // };
    // debug('search keyword is %s.', query, options);
    // rq(options, function(err, response, body) {
    //   debug("down", typeof body);
    //   res.send(body);
    // });

    request.get('/book/fuzzy-search', { params: { query } }).then(result => {
      debug('finish api call.');
      res.send(result.data);
      debug('send out response.');
    }).catch(err => next);
  },

  searchBooksByAuthor(req, res, next) {

  },

  searchBooksByTag(req, res, next) {

  },

  getBookDetail(req, res, next) {
    var id = req.params.id;
    debug('book is %s', id);
    request.get('/book/' + id).then(result => {
      res.send(result.data);
    }).catch(err => next);
  },

  getBookResources(req, res, next) {
    var id = req.params.id;
    debug('book is %s', id);
    request.get('/toc', { params: { view: 'summary', book: id } }).then(result => {
      res.send(result.data);
    }).catch(err => next);
  },

  getChaptersByResouceId(req, res, next) {
    var id = req.params.id;
    debug('book resource is %s', id);
    request.get('/toc/' + id, { params: { view: 'chapters' } }).then(result => {
      debug('finish api call');
      res.send(result.data);
    }).catch(err => next);
  },

  getChapterContent(req, res, next) {
    var link = req.params.url;
    debug('link is %s', link);
    axios.get('http://chapter2.zhuishushenqi.com/chapter/' + encodeURIComponent(link), {
      params: { t: Date.now() },
      headers: {
        'X-Device-Id': '631cf212b409f949264fad9ba1ba1daa',
        'X-User-Agent': 'YouShaQi/2.24.24',
        'User-Agent': 'YouShaQi/2.24.24',
        'Content-Type': 'application/json'
      }
    }).then(result => {
      res.send(result.data);
    }).catch(err => next);
  },

  getRankCategory(req, res, next) {
    request.get('/ranking/gender').then(result => {
      res.send(result.data);
    }).catch(err => next);
  },

  getRankList(req, res, next) {
    var id = req.params.id;
    debug('rank id is %s', id);
    request.get('/ranking/' + id).then(result => {
      res.send(result.data);
    }).catch(err => next);
  },

  getCategories(req, res, next) {
    request.get('/cats/lv2/statistics').then(result => {
      res.send(result.data);
    }).catch(err => next);
  },

  getBooksByCategory(req, res, next) {
    var gender = req.query.gender || false;
    var major = req.params.name || false;
    if (gender === false || major === false) {
      throw { status: 400, message: 'miss paramters' };
    }
    gender = encodeURIComponent(gender);
    var type = req.query.type || 'hot';
    var start = req.query.start || 0;
    var limit = req.query.limit || 50;
    request.get('/book/by-categories', {
      params: { gender, type, major, start, limit }
    }).then(result => {
      debug(result.config);
      debug(result.headers);
      res.send(result.data);
    }).catch(err => next);
  },


}

module.exports = controller;
