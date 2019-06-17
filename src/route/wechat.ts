import {
  Router,
} from 'express'
import {
  Res,
  reflushWechatToken,
  getWechatToken,
} from '../util'

export const wechatRouter = Router()

// 获取wechat token
wechatRouter.get('/getToken', async (req, res) => {
  res.send(Res(await getWechatToken()))
})

// 刷新wechat token
wechatRouter.get('/reflushToken', async (req, res, next) => {
  res.send(Res(await reflushWechatToken()))
})
