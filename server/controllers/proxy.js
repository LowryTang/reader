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
