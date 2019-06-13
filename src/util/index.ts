import {
  fn,
  col,
} from 'sequelize'
import axios, {
  AxiosResponse,
} from 'axios'
import {
  create,
} from 'xmlbuilder'
import {
  sequelize,
} from '../database'
import {
  AccessTokenInfo,
} from '../database/model'
import localStorage from '../database/local'

/**
 * 获取微信公众号token, 获取顺序依次为内存 > database > wechat API
 *
 * @export
 * @returns token
 */
export async function getWechatToken () {
  const regexActive = async (token: AccessTokenInfo) => Date.now() > token.reflushTime.getTime() ? await reflushWechatToken() : token
  if (localStorage.token) {
    return Promise.resolve(regexActive(localStorage.token))
  }
  let token = (async function () {
    let res = await AccessTokenInfo.findOne({
      attributes: [
        [fn('MAX', col('id')), 'id']
      ]
    })
    if (!res!.id) return await reflushWechatToken()
    res = await AccessTokenInfo.findOne({
      where: {
        id: res!.id
      }
    })
    return regexActive(res!)
  })()
  localStorage.token = await token
  return token
}


/**
 * 刷新微信公众号token
 *
 * @export
 * @returns token
 */
export async function reflushWechatToken () {
  const {
    APPID,
    APPSECRET,
  } = process.env
  const res = await axios.get<any, AxiosResponse<{
    access_token: string
    expires_in: number
    errcode?: number
    errmsg?: string
  }>>('https://api.weixin.qq.com/cgi-bin/token', {
    params: {
      grant_type: 'client_credential',
      appid: APPID,
      secret: APPSECRET,
    }
  })
  const token = await sequelize.transaction(async t => {
    const {
      access_token,
      expires_in,
      errcode,
    } = res.data
    if (errcode) throw new Error(`get token error, errcode: ${errcode}`)
    return AccessTokenInfo.create({
      token: access_token,
      reflushTime: Date.now() + expires_in * 1000
    })
  })
  return Promise.resolve(token)
}


/**
 * API result wrapper
 *
 * @export
 * @template T data type
 * @param {T} [data] data
 * @param {ResCode} [code] code
 * @returns data wrapper
 */
export function Res<T> (data?: T, code?: ResCode) {
  if (!code) code = ResCode.SUCCESS
  return {
    data,
    code
  }
}


/**
 * API result code
 *
 * @export
 * @enum {number}
 */
export enum ResCode {
  SUCCESS = 200,
  ERROR = 500,
  TIMEOUT = 400,
}


/**
 * 将对象解析为xml
 *
 * @export
 * @template T 对象类型
 * @param {T} o 对象
 * @returns {string} 解析后的string
 */
export function parseObj2Xml<T> (o: T): string {
  const res: {
    xml: T
  } = {
    xml: o
  }
  return create(res).end()
}
