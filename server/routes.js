var express = require('express')
var router = express.Router()
const proxy = require('http-proxy-middleware')

router.use(
  '/proxy',
  proxy({
    target: 'http://api.zhuishushenqi.com',
    pathRewrite: { '^/api/v1/proxy': '' },
    proxyTimeout: 60000,
    logLevel: 'debug',
    changeOrigin: true,
    secure: false
  })
)

router.use(
  '/chapter',
  proxy({
    target: 'http://chapter2.zhuishushenqi.com/chapter',
    pathRewrite: { '^/api/v1/chapter': '' },
    proxyTimeout: 60000,
    logLevel: 'debug',
    changeOrigin: true,
    secure: false
  })
)

module.exports = router
