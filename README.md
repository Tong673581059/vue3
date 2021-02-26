# vue3
```
基于vue3+vue-router4+webpack4+vant搭建的手机端基础框架
1、可以自适应手机屏幕
2、HttpRequest文件夹主要是axios基础配置配置、Http请求封装，可根据自己需求进行修改（暂未测试）
3、styles文件件主要是公共的css样式（本项目基于less），入口文件是index.less,自定义的css问津需要导入到index.less才会生效
4、util文件夹主要是以下常用的工具类（待完善）
5、router.js是路由配置文件
6、env.* 三个文件是根据不同环境的配置，主要是配置VUE_APP_BASE_URL这个参数加（接口地址）。VUE_APP_STATISTICS_URL是自定义的接口地址可不用
    最后在config/properties.js中配置引用。config文件夹 主要放一些配置信息文件
7、vue.config.js是webpack打包配置文件，可按需修改
```

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
