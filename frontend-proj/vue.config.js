const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://52.36.76.233', // Replace with your API server URL
        changeOrigin: true
      }
    }
  }
};