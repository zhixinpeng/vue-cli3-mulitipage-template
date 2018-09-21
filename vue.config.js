const pages = require('./config/pages')
const debug = process.env.NODE_ENV !== 'production'
const path = require('path')

module.exports = {
  // 根域上下文
  baseUrl: '/',
  // 构建输出目录
  outputDir: 'dist',
  // 静态资源目录（js,css,img,fonts）
  assetsDir: 'assets',
  // 多页面配置
  pages,
  // 是否在开发环境下载每次保存时检查代码
  lintOnSave: true,
  // 是否使用运行时编译器的Vue构建版本
  // 设置为true之后可以在Vue组件中使用template选项，但会使应用增加10k
  runtimeCompiler: false,
  // 默认情况下babel-loader会忽略所有node_modules中的文件
  // 若需要通过Babel显式转译依赖，可以在选项中列出
  transpileDependencies: [],
  // 时候需要生产环境的source map，设置为false可以加速生产环境构建
  productionSourceMap: false,
  // webpack配置，值为对象时会合并配置，为方法时会改写配置
  configureWebpack: config => {
    if (debug) {
      // 开发环境配置
      config.devtool = 'cheap-module-eval-source-map'
    } else {
      // 生产环境配置
    }

    // 通用配置
    Object.assign(config, {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
          'assets': path.resolve(__dirname, './src/assets'),
          'components': path.resolve(__dirname, './src/components')
        }
      }
    })
  },
  // webpack链式操作，用于生成和修改webpack配置
  chainWebpack: config => {
    if (debug) {
      // 开发环境配置
    } else {
      // 生产环境配置
    }

    // 通用配置
    config.module.rule('vue').use('vue-loader').loader('vue-loader').tap(options => {
      // 修改选项
      return options
    })
  },
  // 配置级别高于chainWebpack中关于css loader的配置
  css: {
    // 时候开启识别*.module.[ext]文件为CSS Modules模块
    modules: false,
    // 是否取组件中得CSS提取至一个独立的CSS文件中（而不是动态注入到JavaScript中的inline代码）
    // 默认生产环境为true，开发环境为false
    // 开发环境开启会与CSS热加载不兼容，因此采用默认值即可
    // extract: boolean | Object
    // 是否为CSS开启source map，开启会影响构建性能
    sourceMap: false,
    // 向CSS相关的loader传递选项
    // 支持css/postcss/sass/less/stylus
    loaderOptions: {}
  },
  // 开发环境的服务器环境配置,支持所有webpack-dev-server的选项
  // https://webpack.docschina.org/configuration/dev-server/
  devServer: {
    // 启动时是否打开默认浏览器
    open: false,
    // 指定使用一个host
    host: '0.0.0.0',
    // 指定使用端口
    port: 8080,
    // 是否使用带有HTTPS的HTTP/2提供服务
    https: false,
    // 启用webpack的模块热替换特性
    hot: true,
    // API接口请求代理
    proxy: {},
    // 向PWA插件传递选项
    // https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {}
  }
}