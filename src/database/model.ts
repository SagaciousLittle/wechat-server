import {
  Model,
  DataTypes,
} from 'sequelize'
import {
  sequelize,
} from './index'


/**
 *  微信公众号 - token信息
 *
 * @class AccessTokenInfo
 * @extends {Model}
 * @param id id
 * @param token token
 * @param reflushTime 刷新时间
 */
export class AccessTokenInfo extends Model {
  public id!: number
  public token!: string
  public reflushTime!: Date
}

AccessTokenInfo.init({
  token: {
    type: DataTypes.STRING,
  },
  reflushTime: {
    type: DataTypes.DATE
  }
}, {
  sequelize,
  createdAt: false,
  updatedAt: false
})

sequelize.sync()