var express = require('express')
var debug = require('debug')('reader:controller')
var axios = require('axios')
var httpProxy = require('http-proxy')
var http = require('http')
var https = require('https')
var url = require('url')

var request = axios.create({
  baseURL: 'http://api.zhuishushenqi.com',
  headers: {
    'X-Device-Id': '631cf212b409f949264fad9ba1ba1daa',
    'X-User-Agent': 'YouShaQi/2.24.24',
    'User-Agent': 'YouShaQi/2.24.24',
    'Content-Type': 'application/json'
  }
})

var controller = {
  searchBooks (req, res, next) {
    var params = req.query
    params.v = 1
    request.get('/book/fuzzy-search', { params }).then(result => {
      debug('finish api call.')
      res.send(result.data)
      debug('send out response.')
    }).catch(err => next(err))
  },

  searchBooksByAuthor (req, res, next) {

  },

  searchBooksByTag (req, res, next) {

  },

  getBookDetail (req, res, next) {
    var id = req.params.id
    debug('book is %s', id)
    request.get('/book/' + id).then(result => {
      res.send(result.data)
    }).catch(err => next(err))
  },

  getBookResources (req, res, next) {
    var id = req.params.id
    debug('book is %s', id)
    request.get('/toc', { params: { view: 'summary', book: id } }).then(result => {
      res.send(result.data)
    }).catch(err => next(err))
  },

  getChaptersByResouceId (req, res, next) {
    var id = req.params.id
    debug('book resource is %s', id)
    request.get('/toc/' + id, { params: { view: 'chapters' } }).then(result => {
      debug('finish api call')
      res.send(result.data)
    }).catch(err => next(err))
  },

  getChapterContent (req, res, next) {
    var link = req.query.uri
    debug('link is %s', link)
    axios.get('http://chapter2.zhuishushenqi.com/chapter/' + encodeURIComponent(link), {
      params: { t: Date.now() },
      headers: {
        'X-Device-Id': '631cf212b409f949264fad9ba1ba1daa',
        'X-User-Agent': 'YouShaQi/2.24.24',
        'User-Agent': 'YouShaQi/2.24.24',
        'Content-Type': 'application/json'
      }
    }).then(result => {
      res.send(result.data)
    }).catch(err => next(err))
  },

  getRankCategory (req, res, next) {
    request.get('/ranking/gender').then(result => {
      res.send(result.data)
    }).catch(err => next(err))
  },

  getRankList (req, res, next) {
    var id = req.params.id
    debug('rank id is %s', id)
    request.get('/ranking/' + id).then(result => {
      res.send(result.data)
    }).catch(err => next(err))
  },

  getCategories (req, res, next) {
    request.get('/cats/lv2/statistics').then(result => {
      res.send(result.data)
    }).catch(err => next(err))
  },

  getBooksByCategory (req, res, next) {
    var gender = req.query.gender || false
    var major = req.params.name || false
    if (gender === false || major === false) {
      throw { status: 400, message: 'miss paramters' }
    }
    gender = encodeURIComponent(gender)
    var type = req.query.type || 'hot'
    var start = req.query.start || 0
    var limit = req.query.limit || 50
    request.get('/book/by-categories', {
      params: { gender, type, major, start, limit }
    }).then(result => {
      debug(result.config)
      debug(result.headers)
      res.send(result.data)
    }).catch(err => next(err))
  },

  getImage (req, res, next) {
    var uri = req.query.uri
    debug(uri)
    var uri = url.parse(uri)
    var proxy = uri.protocol.startsWith('https') === true ? https : http
    var connector = proxy.request(uri, (resp) => {
      resp.pipe(res)
    })
    req.pipe(connector)
  }

}

module.exports = controller
