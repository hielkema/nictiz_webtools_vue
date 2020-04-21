module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    disableHostCheck: true
  },
  devServer: {
    proxy: 'https://termservice.test-nictiz.nl/',
  }
}