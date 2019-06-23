/**
 * 同于将每个组件打包成独立的文件
 * @author 吴昊
 * @since 2019/4/5
 */
import {Configuration, Entry} from 'webpack';
import {Component} from './components';

const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

const components = require('./components');
const entry: Entry = {
  index: resolve('src/packages/index.ts')
};
components.forEach((component: Component) => {
  entry[component.dir] = resolve(`src/packages/${component.dir}/index.ts`);
});
module.exports = {
  entry,
  output: {
    path: resolve('dist2'),
    filename: '[name].js'
  },
  mode: 'production',
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      {
        test: /\.vue$/,
        use: [{
          loader: 'vue-loader',
          options: {
            compilerOptions: {preserveWhitespace: false}
          }
        }]
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',//ts加载器
        options: {
          transpileOnly: true,
          appendTsSuffixTo: [/.vue$/]
        }
      },
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: [{loader: 'url-loader', options: {}}]
      },
      {
        test: /\.(svg)(\?.*)?$/,
        use: [{loader: 'file-loader', options: {}}]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [{loader: 'url-loader', options: {}}]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [{loader: 'url-loader', options: {}}]
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', {
          loader: 'less-loader', options: {
            javascriptEnabled: true
          }
        }]
      },
      {
        test: /\.jsx?$/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.vue', '.json', '.md', '.txt', '.jsx'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  plugins: [
    new VueLoaderPlugin()
  ]
} as Configuration;
