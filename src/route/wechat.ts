import {
  Router,
} from 'express'
import {
  Res,
  reflushWechatToken,
  getWechatToken,
} from '../util'

export const wechatRouter = Router()

wechatRouter.get('/getToken', async (req, res) => {
  res.send(Res(await getWechatToken()))
})

wechatRouter.get('/reflushToken', async (req, res, next) => {
  res.send(Res(await reflushWechatToken()))
})
