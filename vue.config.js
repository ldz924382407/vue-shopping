module.exports = {
  //配置map，减少打包后的dist的大小
  productionSourceMap:false,
  // 关闭ESLINT校验工具
  lintOnSave: false,
  devServer: {
    //代理服务器解决跨域
    proxy: {
      "/api": {
        target: "http://39.98.123.211:8510"
      },
    },
    //解决默认打开浏览器，会出现0.0.0.0:8080，浏览器显示无法访问
    host: 'localhost'
  }
};
