const path = require('path')
const glob = require('glob')
const config = require('./config')

module.exports = (() => {
  // 入口模板匹配正则
  const template = config.template
  // 入口脚本匹配正则（全部）
  const entryModulePath = config.entryModulePath
  // 入口脚本匹配正则（可选模块）
  const entryModuleName = [...new Set(config.entryModuleName)]
  // 运行命令行脚本第三个字符串命令
  const entryArgv = process.argv[3]
  // 最终输出的多页面配置对象
  const pages = Object.create(null)
  // 是否运行或者打包全部应用
  const isTargetAll = entryArgv === '--all'

  const getMultiPageConf = (syncPath) => {
    let [fileList, tempArr, modName] = [glob.sync(syncPath), [], null]
    if (fileList.length !== 0) {
      for (let entry of fileList) {
        tempArr = path.dirname(entry, path.extname(entry)).split('/')
        modName = tempArr[tempArr.length - 1]

        if (isTargetAll) {
          // 加入所有应用模块
          Reflect.set(pages, modName, {
            entry,
            filename: `${modName}.html`,
            template
          })
        } else {
          if (!entryModuleName.length) {
            throw new Error('请在config.js中配置需要使用的entryModuleName')
          }
          // 只加入和入口脚本匹配的应用模块
          if (!Object.values(entryModuleName).includes(modName)) {
            continue
          } else {
            Reflect.set(pages, modName, {
              entry,
              filename: `${modName}.html`,
              template
            })
          }
        }

      }
      return true
    } else {
      throw new Error('获取多页面信息出错')
    }
  }

  try {
    while (getMultiPageConf(entryModulePath)) return pages
  } catch (err) {
    console.log('获取多页面数据错误', err)
  }
})()