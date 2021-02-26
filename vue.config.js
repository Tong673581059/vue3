const path = require("path");
const os = require("os");

/**
 * 获取网络ip
 * */
function getNetworkIp() {
  let needHost = ""; // 打开的host
  try {
    // 获得网络接口列表
    let network = os.networkInterfaces();
    for (let dev in network) {
      let iface = network[dev];
      for (let i = 0; i < iface.length; i++) {
        let alias = iface[i];
        if (
            alias.family === "IPv4" &&
            alias.address !== "127.0.0.1" &&
            !alias.internal
        ) {
          needHost = alias.address;
        }
      }
    }
  } catch (e) {
    needHost = "localhost";
  }
  return needHost;
}

module.exports = {
  publicPath: "/", // 部署应用时的根路径(默认'/'),也可用相对路径(存在使用限制)
  outputDir: "dist", // 运行时生成的生产环境构建文件的目录(默认''dist''，构建之前会被清除)
  assetsDir: "public", //放置生成的静态资源(s、css、img、fonts)的(相对于 outputDir 的)目录(默认'')
  indexPath: "index.html", //指定生成的 index.html 的输出路径(相对于 outputDir)也可以是一个绝对路径。
  chainWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      config.plugin("extract-css").tap(() => [
        {
          filename: "[name]/css/[name].[contenthash:8].css",
          chunkFilename: "[name]/css/[name].[contenthash:8].css"
        }
      ]);
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      config.output = {
        path: path.join(__dirname, "./dist"),
        filename: "[name]/js/[name].[contenthash:8].js",
        publicPath: "/",
        chunkFilename: "[name]/js/[name].[contenthash:8].js"
      };
    }
  },
  lintOnSave: true, // 是否在保存的时候检查
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  filenameHashing: true,
  devServer: { // 设置反向代理，解决跨域问题
    // 环境配置
    host: getNetworkIp(),
    port: 8083,
    https: false,
    hotOnly: false,
    open: true, //配置自动启动浏览器
    proxy: {
      '/api': {
        target: 'https: //servercheck.hiconsports.com',
        secure: false,  // 如果是https接口，需要配置这个参数
        ws: true,//是否代理websockets
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUnit: 37.5
          })
        ]
      }
    }
  },
  pluginOptions: {
    // 'style-resources-loader': {
    //   preProcessor: 'less',
    //   patterns: [
    //     path.resolve(__dirname, './src/styles/index.css')
    //   ]
    // }
  }
};
