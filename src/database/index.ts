import {
  Sequelize,
} from 'sequelize'
import cls from 'continuation-local-storage'

// 创建namesapce, 用于事务对象的存储
Sequelize.useCLS(cls.createNamespace('my-very-own-namespace'))

function getValFromEnv (key: string) {
  const v = process.env[key]
  if (!v) throw new Error(`the key: ${key} is not found in process.nev, you should config in env file`)
  return v
}

export const sequelize = new Sequelize('blog', getValFromEnv('DATABASE_USERNAME'), getValFromEnv('DATABASE_PASSWORD'), {
  port: +getValFromEnv('DATABASE_PORT'),
  host: getValFromEnv('DATABASE_HOST'),
  dialect: 'mysql',
  ssl: true,
  pool: {
    max: 30
  }
})

sequelize
  .authenticate()
  .then(() => {
    console.log('connect database success.')
  })
  .catch(err => {
    console.error('connect database failed.', err)
  })


