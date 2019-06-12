import {
  Router,
} from 'express'
import {
  Res,
} from '../util'

export const mainRouter = Router()

mainRouter.get('/', async (req, res) => {
  res.send(Res('hello world'))
})

export {
  wechatRouter,
} from './wechat'