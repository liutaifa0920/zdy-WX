// 内置路径包
const path = require("path");

// 插件-px转rem
const autoprefixer = require("autoprefixer");
const pxtorem = require("postcss-pxtorem");

// 定义resolve方法，获取绝对路径
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  // 部署应用包时的基本 URL,上下文url(静态文件输出的基本地址，同cli3.3版本之前的baseUrl)
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  // 生成的生产环境构建文件的目录，该目录在构建之前会被清除，传入 --no-clean 可关闭该行为(build打包后的目录)，默认: 'dist'
  outputDir: "dist",
  // 放置生成的静态资源(js、css、img、fonts)的目录(相对于 outputDir)
  assetsDir: "assets",
  // 指定生成的 index.html 的输出路径(相对于 outputDir)也可以是一个绝对路径，默认: 'index.html'
  indexPath: "index.html",
  // 文件名hash串，用于控制浏览器缓存，false关闭，默认：true
  filenameHashing: true,

  // 是否开启eslint语法校验，默认true，输出为编译警告在命令行，不会使得编译失败
  // 把错误直接显示在浏览器中，可设置为error，将lint错误输出为编译错误，lint错误将会导致编译失败
  // 可以通过在 devServer 设置让浏览器 overlay 同时显示警告和错误
  // lint检测会在开发模式生产模式都执行，下面配置是只在开发模式执行检测，关闭lint检测设置为false即可
  // 详细请看：https://cli.vuejs.org/zh/config/#lintonsave
  // lintOnSave: process.env.NODE_ENV !== "production",
  lintOnSave: false,

  // 是否使用包含运行时编译器的 Vue 构建版本，会让你包额外增加 10kb 左，默认false
  // 下面配置带有运行时运行时编译器版本，个人认为10kb可以忽略负载
  runtimeCompiler: true,

  // 生产环境的 source map(源码映射，用于调试)，将其设置为 false 以加速生产环境构建
  productionSourceMap: false,

  // 本地服务配置对象
  devServer: {
    // 让浏览器 overlay 同时显示警告和错误
    overlay: {
      warnings: true,
      errors: true
    },

    // 本地服务端口号，0.0.0.0可在局域网访问
    host: "0.0.0.0",
    // 本地服务端口号
    port: 8080,
    // 本地服务热更新
    hotOnly: true
    // 本地服务代理
    // proxy: {
    //   "/api": {
    //     target: "<url>",
    //     ws: true,
    //     changeOrigin: true
    //   },
    //   "/foo": {
    //     target: "<other_url>"
    //   }
    // }
  },

  // webpack配置对象
  configureWebpack: {
    // index.html tit 标题注入
    name: "vue-base",

    // 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖，从而减少输出体积，优化项
    // 使用此方法，需在index.html中cdn引入插件包，并在此配置
    // 具体使用，参考：https://webpack.docschina.org/configuration/externals/#externals
    externals: {}
  },

  // 一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例 ，允许对内部的 webpack 配置进行更细粒度的修改
  // 可通过vue inspect审查webpack内部配置
  // inspect详细请看：https://cli.vuejs.org/zh/guide/webpack.html#%E5%AE%A1%E6%9F%A5%E9%A1%B9%E7%9B%AE%E7%9A%84-webpack-%E9%85%8D%E7%BD%AE
  chainWebpack: config => {
    // 配置svg规则排除icons目录中svg文件处理
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end();

    // 新增icons规则，设置svg-sprite-loader处理icons目录中svg文件
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({ symbolId: "icon-[name]" })
      .end();
  },

  // css配置项
  css: {
    // 是否开启源码映射
    sourceMap: false,
    loaderOptions: {
      postcss: {
        plugins: [
          // px转rem
          autoprefixer(),
          pxtorem({
            rootValue: 16,
            propList: ["*"]
          })
        ]
      }
    }
  }
};
