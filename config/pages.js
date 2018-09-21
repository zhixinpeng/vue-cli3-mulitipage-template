const path = require('path')
const glob = require('glob')

module.exports = (() => {
  const template = 'public/index.html'
  const entryPath = 'src/module/**/main.js'
  const pages = Object.create(null)
  
  const getMultiPageConf = (syncPath) => {
    let [fileList, tempArr, modName] = [glob.sync(syncPath), [], null]
    if (fileList.length !== 0) {
      for (let entry of fileList) {
        tempArr = path.dirname(entry, path.extname(entry)).split('/')
        modName = tempArr[tempArr.length - 1]

        Reflect.set(pages, modName, {
          entry,
          filename: `${modName}.html`,
          template
        })
      }
      return true
    } else {
      throw new Error('获取多页面信息出错')
    }
  }

  try {
    while (getMultiPageConf(entryPath)) return pages
  } catch (err) {
    console.log('获取多页面数据错误', err)
  }
})()