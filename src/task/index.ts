import axios, {
  AxiosResponse,
} from 'axios'
import {
  getWechatToken,
} from '../util'

async function main () {
  
}

main()

interface MaterialCount {
  voice_count: number
  video_count: number
  image_count: number
  news_count: number
}

async function deleteMaterial () {
  const token = (await getWechatToken()).token
  const res: AxiosResponse<MaterialCount> = await axios.get(`https://api.weixin.qq.com/cgi-bin/material/get_materialcount?access_token=${token}`)
  const keys = Object.entries(res.data).filter(([k, v]) => v)
}