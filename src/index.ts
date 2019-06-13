import express, {
  ErrorRequestHandler,
} from 'express'
import bodyParser from 'body-parser'
import xmlParser from 'express-xml-bodyparser'
import dotenv from 'dotenv'
import yargs from 'yargs'
import localStorage from './database/local'
import {
  PORT,
} from './config'

async function main () {
  // 设置全局变量
  const path = yargs.argv.envPath as string || '/etc/wechat.env'
  dotenv.config({path})

  const app = express()

  // 解析body
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: true
  }))

  // 解析xml
  app.use(xmlParser())
  app.use(async (req, res, next) => {
    const {xml} = req.body
    if (typeof xml !== 'object' || typeof xml === null) return next()
    Object.entries(xml).forEach(([k, v]) => {
      if (v instanceof Array && v.length === 1) xml[k] = v[0]
    })
    next()
  })

  // 引入router
  const {
    mainRouter,
    wechatRouter,
  } = await import('./route')

  app.use('/', mainRouter)
  app.use('/wechat', wechatRouter)

  const {
    Res,
    ResCode,
  } = await import('./util')

  // error handler
  const t: ErrorRequestHandler = function(err, req, res, next) {
    res.status(ResCode.ERROR).send(Res(err.message, ResCode.ERROR))
  }

  app.use(t)


  app.listen(PORT, () => {
    console.log(`server start ar port ${PORT}.`)
  })
}

main()