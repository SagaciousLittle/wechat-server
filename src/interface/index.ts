/**
 * 定义interface
 */

/**
 * 自动回复类型
 *
 * @export
 * @interface AutoReply
 */
export interface AutoReply {
  ToUserName: string
  FromUserName: string
  CreateTime: string
  MsgType: 'text' | 'image' | 'voice' | 'video' | 'music' | 'news'
}


/**
 * 自动回复 - 文本类型
 *
 * @interface AutoReplyText
 * @extends {AutoReply}
 */
export interface AutoReplyText extends AutoReply {
  MsgType: 'text'
  Content: string
}


/**
 * 自动回复 - 图片类型
 *
 * @interface AutoReplyImg
 * @extends {AutoReply}
 */
export interface AutoReplyImage extends AutoReply {
  MsgType: 'image'
  Image: {
    MediaId: number
  }
}


/**
 * 自动回复 - 语音类型
 *
 * @interface AutoReplyImg
 * @extends {AutoReply}
 */
export interface AutoReplyVoice extends AutoReply {
  MsgType: 'voice'
  Voice: {
    MediaId: number
  }
}


/**
 * 自动回复 - 视频类型
 *
 * @export
 * @interface AutoReplyVideo
 * @extends {AutoReply}
 */
export interface AutoReplyVideo extends AutoReply {
  MsgType: 'video'
  Video: {
    MediaId: number
    Title?: string
    Description?: string
  }
}


/**
 * 自动回复 - 音乐类型
 *
 * @export
 * @interface AutoReplyMusic
 * @extends {AutoReply}
 */
export interface AutoReplyMusic extends AutoReply {
  MsgType: 'music'
  Music: {
    ThumbMediaId: number
    Title?: string
    Description?: string
    MusicURL?: string
    HQMusicUrl?: string
  }
}


/**
 * 自动回复 - 图文消息
 *
 * @export
 * @interface AutoReplyArticles
 * @extends {AutoReply}
 */
export interface AutoReplyArticles extends AutoReply {
  MsgType: 'news'
  ArticleCount: number
  Articles: {
    item: {
      Title: string
      Description: string
      PicUrl: string
      Url: string
    }[]
  }
}
