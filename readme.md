# 微信服务号后台
## 技术栈
  - typescript, express, sequelize, mysql
## 关键词
  - 微信, 服务号, 公众号, 个人, demo
## 简介
  - 个人的服务号定制，可供参考学习，微信搜索王多鱼的妹妹王多戏可预览，欢迎fork，共同进步~
## 说明
  - 关于环境
    - 本项目使用yarn进行包管理，pm2进行线上部署，需要用户提前全局安装
    - exec：``` npm i -g yarn pm2```
    - yarn 文档：[click here](https://yarnpkg.com/zh-Hant/)
    - pm2 文档：[click here](http://pm2.keymetrics.io/)
  - 关于env文件，环境有关的变量需要在env文件中设置，故需要单独配置，env文件设计服务器，MSQL等相关登陆信息，故并未上传，需要开发者自行配置。
    - 默认位置：```/etc/wechat.env```
    - 可以通过命令行方式动态设置配置文件位置，如 ```yarn build --envPath ${位置}```
    - env文件所需配置如下
      ```
        # 微信appid
        APPID=${APPID}
        # 微信开发者密钥
        APPSECRET=${APPSECRET}
        # 数据库服务器ip
        DATABASE_HOST=${DATABASE_HOST}
        # 数据库服务器host
        DATABASE_PORT=${DATABASE_PORT}
        # 数据库用户名
        DATABASE_USERNAME=${DATABASE_USERNAME}
        # 数据库密码
        DATABASE_PASSWORD=${DATABASE_PASSWORD}
      ```
  - 关于部署
    - exec：```pm2 start dist/index.js```
## 关于我
  - 我只是一条咸鱼。
