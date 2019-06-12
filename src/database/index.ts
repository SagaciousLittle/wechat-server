import {
  Sequelize,
} from 'sequelize'

const {env} = process

const username = env['DATABASE_USERNAME']
const password = env['DATABASE_PASSWORD']

if (!username || !password) throw new Error('please set username and password in .env file')

export const sequelize = new Sequelize('blog', username, password, {
  dialect: 'mysql',
  ssl: true,
  host: env['DATABASE_HOST'],
  port: Number(env['DATABASE_PORT']),
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

