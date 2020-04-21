module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    disableHostCheck: true
  },
  devServer: {
    proxy: 'https://snowstorm.test-nictiz.nl/',
  }
}