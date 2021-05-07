module.exports = {
  css: {
    loaderOptions: {
      // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
      scss: {
        additionalData: `@import "~@/styles/element-variables.scss";`
      },

    }
  },
  devServer: {
    proxy: {
      '/boos': {
        target: 'http://eduboss.lagou.com',
        changeOrigin: true
      },
      '/front': {
        target: 'http://eduboss.lagou.com',
        changeOrigin: true
      }
    }
  }
}
