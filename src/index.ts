import express, {
  ErrorRequestHandler,
} from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import yargs from 'yargs'
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