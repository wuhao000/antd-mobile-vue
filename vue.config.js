/**
 * @Author : Duyuntao
 * @Date : 2019/4/2
 * @Version : 1.0
 * @Content : 项目配置文件
 */

module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  configureWebpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: [
        {
          loader: 'html-loader'
        },
        {
          loader: 'markdown-loader',
          options: {}
        }
      ]
    });
    config.module.rules.push({
      test: /\.txt$/,
      use: [
        { loader: 'raw-loader' },
        { loader: 'decoded-text-loader' }
      ]
    });
  }
};
