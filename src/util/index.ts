import {
  fn,
  col,
} from 'sequelize'
import axios, {
  AxiosResponse,
} from 'axios'
import {
  AccessTokenInfo,
} from '../database/model'

/**
 * 获取微信公众号token
 *
 * @export
 * @returns token
 */
export async function getWechatToken () {
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
  if (Date.now() > res!.reflushTime.getTime()) return await reflushWechatToken()
  return Promise.resolve(res!.token)
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
  const {
    access_token,
    expires_in,
    errcode,
  } = res.data
  if (errcode) throw new Error(`get token error, errcode: ${errcode}`)
  await AccessTokenInfo.create({
    token: access_token,
    reflushTime: Date.now() + expires_in * 1000
  })
  return Promise.resolve(access_token)
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
