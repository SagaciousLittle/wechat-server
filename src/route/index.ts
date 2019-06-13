import {
  Router,
} from 'express'
import {
  Res,
  parseObj2Xml,
} from '../util'
import {
  AutoReplyText,
} from '../interface'

export const mainRouter = Router()

mainRouter.get('/', async (req, res) => {
  res.send(Res('hello world'))
})

// wechat消息被动回复
mainRouter.post('/', async (req, res) => {
  const {
    fromusername,
    tousername,
    createtime,
  } = req.body.xml
  res.send(parseObj2Xml<AutoReplyText>({
    ToUserName: fromusername,
    FromUserName: tousername,
    CreateTime: createtime,
    Content: 'yoyoyo~',
    MsgType: 'text'
  }))
})

export {
  wechatRouter,
} from './wechat'