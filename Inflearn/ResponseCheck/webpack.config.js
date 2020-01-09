const path = require('path');

module.exports = {
  mode : 'development', //개발시에는 production
  devtool : 'eval', // 속도 = 빠르게 //개발시에는 hidden-source-map

  resolve : {
    extensions : ['.jsx', '.js'] // 웹팩이 알아서 찾아준다. 파일을
  },

  entry : {    //입력파일
    app : ['./client'],
  },
  module : { //입력파일들을 어떻게할건지
    rules : [{
      test : /\.jsx?$/,
      loader : 'babel-loader',
      options : {
        presets : [
          ['@babel/preset-env'],
          ['@babel/preset-react'],
          ],
        plugins : ['@babel/plugin-proposal-class-properties','react-hot-loader/babel'],
      },
    }],
  },
  output : {  //출력파일
    filename : 'app.js',
    path : path.join(__dirname,'dist'),
  },
};
