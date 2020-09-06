const resolve = dir => require("path").join(__dirname, dir);

module.exports = {
  publicPath: "/", // 基本路径
  outputDir: "dist", // 输出文件目录
  assetsDir: "static", // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 , Default: ''
  indexPath: "index.html", //Default: 'index.html' // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  lintOnSave: false, //Default: true resolve// eslint-loader 是否在保存的时候检查,有效的值：true | false | "error"设置为 "error" 时，检查出的错误会触发编译失败。
  productionSourceMap: false, //Default: true // 生产环境是否生成 sourceMap 文件 , 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  // webpack配置
  chainWebpack: config => {
    config.resolve.symlinks(true); // 修复HMR
    config.resolve.alias.set("@", resolve("src")); //配置快捷路径，styles为路径名字，resolve是原路径地址
    // 配置svg
    config.module
      .rule("svg")
      .exclude.add(resolve("src/assets/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/assets/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();
  },
  css: {
    // css预设器配置项
    loaderOptions: {
      sass: {
        prependData:
          '@import "@/styles/common.scss";' +
          '@import "@/styles/mixin.scss";' +
          '@import "@/styles/variable.scss";'
      }
    }
  },
  // webpack-dev-server 相关配置
  devServer: {
    host: "0.0.0.0",
    disableHostCheck: true,
    port: 8080,
    https: false,
    hotOnly: false,
    compress: true, // 开启gzip
    //proxy: null, // 设置代理
    proxy: {
      "/devInterface/": {
        // 目标:指向网络地址
        target: "http://www.aa739.cn:8095/",
        // webpack属性，映射一个host
        changeOrigin: true,
        pathRewrite: {
          "/devInterface/": ""
        }
      },
      "/devInterface2/": {
        // 目标:指向网络地址
        target: "http://www.aa739.cn:8099/",
        // webpack属性，映射一个host
        changeOrigin: true,
        pathRewrite: {
          "/devInterface2/": ""
        }
      }
    }
  }
};
