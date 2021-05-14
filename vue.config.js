module.exports = {
  css: {
    // 是否开启css分离 在开发环境开启会导致热更新异常
    extract: false,
    // 在浏览器审查时是否显示当前css文件路径 开发环境建议开启 不影响热更新
    sourceMap: true,
    loaderOptions: {
      // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
      scss: {
        additionalData: `@import "~@/styles/element-variables.scss";`
      },

    }
  },
  devServer: {
    proxy: {
      '/boss': {
        target: 'http://eduboss.lagou.com',
        changeOrigin: true // 把请求头中的 host 配置为 target
      },
      '/front': {
        target: 'http://edufront.lagou.com',
        changeOrigin: true
      }
    }
  }
}
